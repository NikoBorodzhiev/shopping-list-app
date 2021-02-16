import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { decodeToken } from '@utils';

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const decodedInfo = decodeToken(request.headers.authorization);
    request.userData = decodedInfo;
    return true;
  }
}
