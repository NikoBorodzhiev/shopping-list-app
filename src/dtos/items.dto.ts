import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @ApiProperty()
  public name: string;

  @IsNumber()
  @ApiProperty()
  public price: number;
}

export class UpdateItemDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  public name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  public price: number;
}