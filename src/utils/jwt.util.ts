import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import CONFIG from '@config';
import { ITokenPayload } from '@interfaces';
import { TokenType } from '@enums';

const {
  SECRET_KEY,
  ACCESS_EXP,
  REFRESH_EXP,
  ALGORITHM,
  ISS,
  SUB,
} = CONFIG.JWT;

export function generateToken(
  tokenPayload: ITokenPayload,
  type: TokenType,
): string {
  const token = jwt.sign(tokenPayload, SECRET_KEY, {
    algorithm: ALGORITHM,
    issuer: ISS,
    subject: SUB,
    expiresIn:
      type === TokenType.ACCESS ? ACCESS_EXP : REFRESH_EXP,
  });
  return token;
};

export function decodeToken(token: string): ITokenPayload {
  try {
    const decodedInfo = jwt.verify(token, SECRET_KEY, {
      ignoreExpiration: false,
      issuer: ISS,
    }) as ITokenPayload;
    return decodedInfo;
  } catch ({ message }) {
    throw new UnauthorizedException(message);
  }
};
