import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './schema/user-schema';
import { LoginDto } from './dto/user.dto';
import { JwtPayload } from 'src/common/interface/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCityRequest } from './city-create-handle';
import { UpdateCityRequest } from './city-update-handle';
import { CreateCountryRequest } from './country-create-handle';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('CITY_SERVICE') private readonly client: ClientProxy,
    @Inject('COUNTRY_SERVICE') private readonly countryClient: ClientProxy,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(params: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: params.email },
      });

      if (!user) {
        return new HttpException('Invalid email or password', 401);
      }
      const isPasswordValid = await bcrypt.compare(
        params.password,
        user.password,
      );

      if (!isPasswordValid) {
        return new HttpException('Invalid email or password', 401);
      }

      const authToken = this.generateAuthToken(user);
      console.log('authToken: ', authToken);

      return {
        statusCode: HttpStatus.OK,
        message: 'User login successful',
        data: user,
        authToken,
      };
    } catch (error) {
      console.log('error: ', error);
    }
  }

  generateAuthToken(user: any) {
    const payload: JwtPayload = {
      id: user.id,
      userId: user.id,
      email: user.email,
      type: 'user',
    };
    console.log('payload: ', payload);
    return this.jwtService.sign(payload, {
      secret: 'your_secret_key',
      expiresIn: '1h',
    });
  }

  async getCityList() {
    try {
      console.log('---GET CITY LIST');
      return this.client.send({ role: 'city', cmd: 'list' }, {});
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async createCity(param: CreateCityRequest) {
    try {
      console.log('---CREATE CITY');
      const result = this.client.send({ cmd: 'create_city' }, param);
      return result;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateCity(param: UpdateCityRequest) {
    try {
      console.log('---UPDATE CITY');
      const update = this.client.send({ cmd: 'update_city' }, param);
      return update;
    } catch (error) {
      console.log('error: ', error);
      throw new Error('Failed to update city');
    }
  }

  async getDetails(param: UpdateCityRequest) {
    try {
      console.log('---GET DETAILS');
      const details = this.client.send({ role: 'city', cmd: 'details' }, param);
      return details;
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async deleteCity(param: UpdateCityRequest) {
    try {
      const deleteCity = this.client.send({ cmd: 'deleteCity' }, param);
      return deleteCity;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async createCountry(param: CreateCountryRequest) {
    try {
      const countryCreate = this.countryClient.send(
        { cmd: 'create_country' },
        param,
      );
      return countryCreate;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateCountry(param: CreateCountryRequest) {
    try {
      const updateCity = this.countryClient.send(
        { cmd: 'update_country' },
        param,
      );
      return updateCity;
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async getList() {
    try {
      const countryData = this.countryClient.send(
        { cmd: 'list', role: 'country' },
        {},
      );

      return countryData;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async getCountryDetails(id: number) {
    console.log('id: ', id);
    try {
      const countryDetails = this.countryClient.send(
        { cmd: 'details', role: 'country' },
        id,
      );
      return countryDetails;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async deleteCountry(id: number) {
    
    try {
      const deleteCountry = this.countryClient.send(
        { cmd: 'deleteCountry' },
        id,
      );
      return deleteCountry;
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
