import { SetMetadata } from '@nestjs/common';
export const AllowAccess = (...roles: string[]) => SetMetadata('roles', roles);
