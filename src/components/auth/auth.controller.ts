import { CreateUserDto, LoginDto } from '@dtos';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@providers';

@ApiTags('Authorization & Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  public register(
    @Body() data: CreateUserDto,
  ) {
    return this.authService.register(data);
  }

  @Post('login')
  private login(
    @Body() data: LoginDto
  ) {
    return this.authService.login(data);
  }

  @Post('refresh')
  private refresh(@Body('token') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}