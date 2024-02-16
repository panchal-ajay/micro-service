import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/user.dto';
import { UpdateCityRequest } from './city-update-handle';

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
}
