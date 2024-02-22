import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CountryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
