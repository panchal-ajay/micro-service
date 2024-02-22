import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/user.dto';
import { UpdateCityRequest } from './city-update-handle';
import { CreateCountryRequest } from './country-create-handle';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/login')
  async userLogin(@Body() params: LoginDto) {
    return this.userService.login(params);
  }

  @Get('/city-list')
  async getCityList() {
    return this.userService.getCityList();
  }

  @Post('/city-create')
  async createCity(@Body() params: UpdateCityRequest) {
    return this.userService.createCity(params);
  }

  @Put('/city-update')
  async updateCity(@Body() params: UpdateCityRequest) {
    return this.userService.updateCity(params);
  }

  @Get('/city-details')
  async getDetails(@Body() params: UpdateCityRequest) {
    return this.userService.getDetails(params);
  }

  @Delete('/city-delete')
  async deleteCity(@Body() param: UpdateCityRequest) {
    return this.userService.deleteCity(param);
  }

  @Post('/country-create')
  async createCountry(@Body() param: CreateCountryRequest) {
    return this.userService.createCountry(param);
  }
  @Put('/country-update')
  async updateaCountry(
    @Body()
    param: CreateCountryRequest,
  ) {
    return this.userService.updateCountry(param);
  }

  @Get('/country-list')
  async getList() {
    return this.userService.getList();
  }

  @Get('/country-details/:id')
  async getCountryDetails(@Param('id') id: number) {
    console.log('id: ', id);
    return this.userService.getCountryDetails(id);
  }

  @Delete('/country-delete/:id')
  async deleteCountry(@Param('id') id: number) {
    console.log('id: ', id);
    return this.userService.deleteCountry(id);
  }
}
