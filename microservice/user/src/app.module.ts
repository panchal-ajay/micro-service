import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserTypeMiddleware } from './middleware/user-middleware';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserTypeMiddleware)
      .forRoutes('/user/city-details', '/user/city-update');
  }
}
