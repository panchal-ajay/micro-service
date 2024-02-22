import { Controller } from '@nestjs/common';
import { CityService } from './city.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateCityDto } from './dto/city-create-dto';
import { UpdateCityDto } from './dto/update-city-dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @MessagePattern({ role: 'city', cmd: 'list' })
  async handleCityList() {
    return this.cityService.cityList();
  }

  @EventPattern({ cmd: 'create_city' })
  async handleCityCreate(params: CreateCityDto) {
    console.log('params: ', params);
    return this.cityService.createCity(params);
  }

  @EventPattern({ cmd: 'update_city' })
  async handleCityUpdate(params: UpdateCityDto) {
    console.log('params: ', params);
    return this.cityService.update(params);
  }

  @MessagePattern({ role: 'city', cmd: 'details' })
  async handleCityDetails(param: UpdateCityDto) {
    return this.cityService.getDetails(param);
  }

  @EventPattern({ cmd: 'deleteCity' })
  async handleCityDelete(param: UpdateCityDto) {
    return this.cityService.  deleteCity(param);
  }
}
