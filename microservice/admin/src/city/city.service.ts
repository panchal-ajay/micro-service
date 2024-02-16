import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { City, CityDocument } from './schema/city-schema';
import { InjectModel } from '@nestjs/mongoose';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CreateCityDto } from './dto/city-create-dto';
import { UpdateCityDto } from './dto/update-city-dto';

@Injectable()
export class CityService {
  constructor(
    @Inject('CITY_SERVICE') private readonly client: ClientProxy,
    @InjectModel(City.name)
    private readonly cityModel: Model<CityDocument>,
  ) {}
  async createCity(params: CreateCityDto) {
    console.log('---Create City API calling from admin side');
    try {
      const cityCreate = await this.cityModel.create(params);

      await cityCreate.save();
      return {
        statusCode: HttpStatus.OK,
        message: 'City create Successfully',
      };
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async cityList() {
    console.log('---Get City list API calling from admin side');
    try {
      const cities = await this.cityModel.find();
      console.log('cities: ', cities);

      return cities;
    } catch (error) {
      throw new Error('Could not fetch city list');
    }
  }

  async update(updateDto: UpdateCityDto) {
    try {
      const updatedCity = await this.cityModel.findOneAndUpdate(
        { _id: updateDto.cityId },
        updateDto,
        { new: true },
      );
      console.log('updatedCity: ', updatedCity);

      return {
        statusCode: HttpStatus.OK,
        message: 'City updated successfully',
        data: updatedCity,
      };
    } catch (error) {
      console.log('Error updating city: ', error);
    }
  }

  async getDetails(param: UpdateCityDto) {
    try {
      const data = await this.cityModel.findById({ _id: param.cityId });
      console.log('data: ', data);
      return {
        statusCode: HttpStatus.OK,
        message: 'City Details fetch successfully',
        data: data,
      };
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
