import { Controller } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/country-dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UpdateCountryDto } from './dto/update-dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
  @EventPattern({ cmd: 'create_country' })
  async countryCreate(param: CreateCountryDto) {
    return this.countryService.createCountry(param);
  }

  @EventPattern({ cmd: 'update_country' })
  async updateCountry(param: UpdateCountryDto) {
    return this.countryService.updateCountry(param);
  }

  @MessagePattern({ cmd: 'list', role: 'country' })
  async getList() {
    return this.countryService.getList();
  }

  @MessagePattern({ cmd: 'details', role: 'country' })
  async getDetails(id: number) {
    console.log('id: ', id);
    return this.countryService.getDetails(id);
  }

  @MessagePattern({ cmd: 'deleteCountry' })
  async deleteCountry(id: number) {
    return this.countryService.deleteCountry(id);
  }
}
