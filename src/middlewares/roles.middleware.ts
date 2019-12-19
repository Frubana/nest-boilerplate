import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';



@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request & any, res: Response, next: Function) {
    const userRoles = req.headers.role ? req.headers.role : '1'
    req.user = {roles: userRoles};
    next();
  }
}
