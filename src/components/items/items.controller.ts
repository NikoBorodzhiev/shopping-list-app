import { CreateItemDto, UpdateItemDto } from '@dtos';
import { ItemEntity } from '@entities';
import { ItemsService } from '@providers';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Roles } from '@enums';
import { AuthGuard, RolesGuard, AllowAccess } from '@guards';
import { ITokenPayload } from '@interfaces';
import { UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Items')
@ApiBearerAuth()
@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.OWNER, Roles.BUYER)
  private getAll(): Promise<ItemEntity[]> {
    return this.itemsService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.OWNER, Roles.BUYER)
  private getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ItemEntity> {
    return this.itemsService.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.OWNER)
  private create(
    @Request() { userData }: { userData: ITokenPayload },
    @Body() data: CreateItemDto,
  ): Promise<ItemEntity> {
    return this.itemsService.create({ ...data, ownerId: userData.id });
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.OWNER)
  private update(
    @Request() { userData }: { userData: ITokenPayload },
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateItemDto,
  ): Promise<UpdateResult> {
    return this.itemsService.update(id, userData.id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.OWNER)
  private delete(
    @Request() { userData }: { userData: ITokenPayload },
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.itemsService.delete(id, userData.id);
  }
}