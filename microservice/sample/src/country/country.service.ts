import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './schema/country-schema'; // Assuming you have defined a Country entity
import { CreateCountryDto } from './dto/country-dto';
import { UpdateCountryDto } from './dto/update-dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
  ) {}

  async createCountry(params: CreateCountryDto) {
    console.log('params: ', params);
    const existing = await this.countryRepository.findOne({
      where: { name: params.name },
    });

    if (existing) {
      throw new HttpException(
        'This country already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const newCountry = this.countryRepository.create(params);
      const savedCountry = await this.countryRepository.save(newCountry);

      return {
        status: HttpStatus.CREATED,
        message: 'Country created successfully',
        data: savedCountry,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create country',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCountry(param: UpdateCountryDto) {
    try {
      const existingCountry = await this.countryRepository.findOne({
        where: { id: param.id },
      });

      if (!existingCountry) {
        throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
      }

      const updatedCountry = await this.countryRepository.update(
        {
          id: param.id,
        },
        param,
      );

      return {
        status: HttpStatus.OK,
        message: 'Country updated successfully',
        data: {},
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update country',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getList() {
    try {
      const [data, totalRecords] = await Promise.all([
        this.countryRepository.find(),
        this.countryRepository.count(),
      ]);

      return {
        status: HttpStatus.OK,
        message: 'Countries fetched successfully',
        data: data,
        totalRecords: totalRecords,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch countries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getDetails(id: number) {
    console.log('id: ', id);
    try {
      const country = await this.countryRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!country) {
        return new HttpException('Country not found', HttpStatus.NOT_FOUND);
      }

      return {
        status: 200,
        message: 'Country details fetched successfully',
        data: country,
      };
    } catch (error) {}
  }

  async deleteCountry(id: number) {
    try {
      const deleteCountry = await this.countryRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!deleteCountry) {
        return new HttpException('Country not found', HttpStatus.NOT_FOUND);
      }

      const country = await this.countryRepository.delete({
        id: id,
      });
      console.log('country: ', country);

      return {
        satus: 200,
        message: ' Country delete successfully',
        data: {},
      };
    } catch (error) {}
  }
}
