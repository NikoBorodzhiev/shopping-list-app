import { CreateListDto, UpdateListDto } from '@dtos';
import { ListEntity } from '@entities';
import { ListsService } from '@providers';
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
import { ICreateList, ITokenPayload } from '@interfaces';
import { UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Lists')
@ApiBearerAuth()
@Controller('lists')
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
  ) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.BUYER)
  private getAll(
    @Request() { userData }: { userData: ITokenPayload },
  ): Promise<ListEntity[]> {
    return this.listsService.getAll(userData.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.BUYER)
  private getById(
    @Request() { userData }: { userData: ITokenPayload },
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ListEntity> {
    return this.listsService.getById(id, userData.id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.BUYER)
  private create(
    @Request() { userData }: { userData: ITokenPayload },
    @Body() data: CreateListDto,
  ): Promise<ICreateList & ListEntity> {
    return this.listsService.create({ ...data, userId: userData.id });
  }
  
  @Post(':listId/item/:itemId')
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.BUYER)
  private addItemToList(
    @Request() { userData }: { userData: ITokenPayload },
    @Param('listId', ParseUUIDPipe) list: string,
    @Param('itemId', ParseUUIDPipe) item: string,
  ) {
    return this.listsService.addItemToList(list, item, userData.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.BUYER)
  private update(
    @Request() { userData }: { userData: ITokenPayload },
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateListDto,
  ): Promise<UpdateResult> {
    return this.listsService.update(id, userData.id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.BUYER)
  private delete(
    @Request() { userData }: { userData: ITokenPayload },
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.listsService.delete(id, userData.id);
  }

  @Delete(':listId/item/:itemId')
  @UseGuards(AuthGuard, RolesGuard)
  @AllowAccess(Roles.BUYER)
  private deleteItemFromList(
    @Request() { userData }: { userData: ITokenPayload },
    @Param('listId', ParseUUIDPipe) list: string,
    @Param('itemId', ParseUUIDPipe) item: string,
  ) {
    return this.listsService.deleteItemFromList(list, item, userData.id);
  }
}