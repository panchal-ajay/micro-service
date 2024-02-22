import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountryEntity } from './schema/country-schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
