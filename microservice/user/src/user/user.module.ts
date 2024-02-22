import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './schema/user-schema';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: 'CITY_SERVICE',
        transport: Transport.TCP,
        options: { port: 2000 },
      },
      {
        name: 'COUNTRY_SERVICE',
        transport: Transport.TCP,
        options: { port: 6000 },
      },
    ]),
  ],
  providers: [UserService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
