import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user-schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/user.dto';
import { JwtPayload } from 'src/common/interface/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCityRequest } from './city-create-handle';
import { UpdateCityRequest } from './city-update-handle';

@Injectable()
export class UserService {
  constructor(
    @Inject('CITY_SERVICE') private readonly client: ClientProxy,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(params: LoginDto) {
    try {
      const user = await this.userModel.findOne({ email: params.email });

      if (!user) {
        throw new HttpException('Invalid email or password', 401);
      }
      const isPasswordValid = await bcrypt.compare(
        params.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new HttpException('Invalid email or password', 401);
      }

      const authToken = this.generateAuthToken(user);

      return {
        statusCode: HttpStatus.OK,
        message: 'User login successful',
        user,
        authToken,
      };
    } catch (error) {
      console.log('error: ', error);
    }
  }

  generateAuthToken(user: any) {
    const payload: JwtPayload = {
      id: user._id,
      userId: user._id,
      email: user.email,
      type: 'user',
    };
    return this.jwtService.sign(payload, {
      secret: 'your_secret_key',
      expiresIn: '1h',
    });
  }

  getCityList() {
    try {
      console.log('---GET CITY LIST');
      return this.client.send({ role: 'city', cmd: 'list' }, {});
    } catch (error) {
      console.log('error: ', error);
    }
  }

  createCity(param: CreateCityRequest) {
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
}
