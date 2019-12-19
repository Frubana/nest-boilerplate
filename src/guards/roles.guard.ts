import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { roleDictionary } from './role.dictionary';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string[]>('role', context.getHandler());
    if (!role) {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        error: 'your role is not valid'
      }, 403);
    }
    const request = context.switchToHttp().getRequest();
    const user: Record<string, string | number> = request.user;
    console.log(request.user)
    const roleUser = roleDictionary(parseInt(user.roles as string))
    const hasRole = () => role.includes(roleUser);
    if(user && user.roles && hasRole()){
      return true;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        error: 'your role is not valid'
      }, 403)
    }
  }
}
