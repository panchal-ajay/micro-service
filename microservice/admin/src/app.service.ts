import { Inject, Injectable } from '@nestjs/common';
import { CreateRequestUser } from './create-user-request';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user-event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('COMUNICATION')
    private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS')
    private readonly analyticsClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createRequestUser: CreateRequestUser) {
    this.users.push(createRequestUser);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createRequestUser.email),
    );
    this.users.push(createRequestUser);
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createRequestUser.email),
    );
  }

  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
