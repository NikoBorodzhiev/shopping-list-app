import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { decodeToken } from '@utils';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  public canActivate(
    context: ExecutionContext
  ): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      if (!request.headers.authorization) {
        throw new UnauthorizedException();
      }

      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      const data = decodeToken(request.headers.authorization);
      return roles.includes(data.role)
        ? true
        : false;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

}
