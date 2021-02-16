import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { DatabaseModule, RedisModule } from '@core';
import { UserEntity } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@repositories';
import { ITokenPair } from '@interfaces';
import { Roles } from '@enums';

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([UserRepository, UserEntity]),
        RedisModule,
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = await moduleRef.resolve(AuthService);
  });

  describe('POST auth/register', () => {
    it('Should return tokens pair', async () => {
      const user = {
        name: 'Test',
        email: 'test@gmail.com',
        password: 'Qwerty12345',
        role: Roles.OWNER
      };

      const result: ITokenPair = {
        access: 'something',
        refresh: 'value'
      };

      jest.spyOn(authService, 'register').mockImplementation(async() => result);
      expect(await authController.register(user)).toBe(result);
    });
  });
});