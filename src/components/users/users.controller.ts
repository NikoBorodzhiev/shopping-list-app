import { Controller } from '@nestjs/common';
import { UsersService } from '@providers';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}
}