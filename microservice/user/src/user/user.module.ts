import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user-schema';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      {
        name: 'CITY_SERVICE',
        transport: Transport.TCP,
        options: { port: 2000 },
      },
      {
        name: 'create',
        transport: Transport.TCP,
        options: { port: 2000 },
      },
    ]),
  ],
  providers: [UserService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
