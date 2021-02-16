import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateListDto {
  @IsString()
  @ApiProperty()
  public name: string;
}

export class UpdateListDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  public name?: string;
}