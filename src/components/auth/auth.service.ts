import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@repositories';
import { ILogin, ITokenPair, ITokenPayload } from '@interfaces';
import { TokenType } from '@enums';
import {
  decodeToken,
  generateToken,
  compareHash,
} from '@utils';
import { RedisService } from '@core';
import { CreateUserDto } from '@dtos';

@Injectable()
export class AuthService {
  constructor(
    @Inject('REDIS')
    private readonly redisService: RedisService,
    @InjectRepository(UserRepository)
    private readonly usersRepository: UserRepository,
  ) {}

  public async register(user: CreateUserDto): Promise<ITokenPair> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (foundUser) {
      throw new ConflictException('Email already in use.');
    }

    const { id, email, role } = await this.usersRepository.createUser(user);
    const tokenPayload = { id, email, role } as ITokenPayload;
    return this.generateSession(tokenPayload);
  }

  public async login(user: ILogin): Promise<ITokenPair> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: user.email },
      select: ['id', 'email', 'password', 'role'],
    });
    if (!foundUser) {
      throw new NotFoundException('User is not found.');
    }
    await this.validatePassword(user.password, foundUser.password);
    const { id, email, role } = foundUser;
    const tokenPayload = { id, email, role } as ITokenPayload;
    return this.generateSession(tokenPayload);
  }

  public async refresh(refreshToken: string): Promise<ITokenPair> {
    const { id, email, role }: ITokenPayload = decodeToken(refreshToken);
    await this.compareOneTimeRefresh(id, refreshToken);
    return this.generateSession({ id, email, role});
  }

  private async generateSession(
    tokenPayload: ITokenPayload,
  ): Promise<ITokenPair> {
    const tokenPair = this.generateTokenPair(tokenPayload);
    await this.setOneTimeRefresh(tokenPayload.id, tokenPair.refresh);
    return tokenPair;
  }

  private generateTokenPair(tokenPayload: ITokenPayload): ITokenPair {
    const access = generateToken(tokenPayload, TokenType.ACCESS);
    const refresh = generateToken(tokenPayload, TokenType.REFRESH);
    return { access, refresh };
  }

  private setOneTimeRefresh(
    id: string,
    refreshToken: string,
  ): Promise<unknown> {
    return this.redisService.set(id, refreshToken);
  }

  private async compareOneTimeRefresh(
    id: string,
    refreshToken: string,
  ): Promise<void> {
    const redisRefresh = await this.redisService.get(id);
    if (redisRefresh !== refreshToken) {
      throw new ForbiddenException('Invalid refresh provided.');
    }
  }

  private async validatePassword(
    password: string,
    hash: string,
  ): Promise<void> {
    const passwordCoincide: boolean = await compareHash(
      password,
      hash,
    );
    if (!passwordCoincide) {
      throw new UnauthorizedException('Wrong password provided.');
    }
  }
}