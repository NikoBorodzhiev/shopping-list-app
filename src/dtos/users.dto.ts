import { Roles } from '@enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  public name: string;

  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsString()
  @ApiProperty()
  public password: string;

  @IsEnum(Roles)
  @ApiProperty({ enum: Roles })
  public role: Roles;
}