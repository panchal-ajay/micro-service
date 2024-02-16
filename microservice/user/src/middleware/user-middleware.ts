import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

@Injectable()
export class UserTypeMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new HttpException(
        'Bearer token is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      if (decodedToken.type !== 'user') {
        console.log('decodedToken.type: ', decodedToken.type);
        throw new HttpException('Unauthorized access', HttpStatus.FORBIDDEN);
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
