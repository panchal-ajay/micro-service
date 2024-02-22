import { HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { City, CityDocument } from './schema/city-schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCityDto } from './dto/city-create-dto';
import { UpdateCityDto } from './dto/update-city-dto';
import { errorResponse, successResponse } from 'src/common/type.exeption';
import { messages } from 'src/common/response.message';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: Model<CityDocument>,
  ) {}
  async createCity(params: CreateCityDto) {
    console.log('---Create City API calling from admin side');
    try {
      const existing = await this.cityModel.findOne({
        name: params.name,
      });
      if (existing) {
        return errorResponse(messages.CITY.EXISTING);
      }
      const cityCreate = await this.cityModel.create(params);

      await cityCreate.save();
      return successResponse({}, messages.CITY.CREATE);
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async cityList() {
    console.log('---Get City list API calling from admin side');
    try {
      const cities = await this.cityModel.find();
      const count = await this.cityModel.countDocuments(cities);
      return {
        message: 'City list fetched successfully',
        data: cities,
        total_record: count,
      };
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

      if (!updatedCity) {
        return errorResponse(messages.CITY.NOT_FOUND);
      }

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
      return successResponse(data, messages.CITY.CITY_DETAILS);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async deleteCity(params: UpdateCityDto) {
    try {
      const deleteCity = await this.cityModel.findOneAndDelete({
        _id: params.cityId,
      });
      if (!deleteCity) {
        return errorResponse(messages.CITY.NOT_FOUND);
      }
      console.log('deleteCity: ', deleteCity);
      return successResponse({}, messages.SUCC);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
