import { Algorithm } from 'jsonwebtoken';

export type CONFIG_TYPES = {
  APP: {
    PORT: number;
    CORS_ALLOWED_ORIGINS: string[],
  },
  DATABASE: {
    TYPE: string;
    HOST: string;
    PORT: number;
    USERNAME: string;
    PASSWORD: string;
    DATABASE: string;
    SYNCHRONIZE: boolean;
    LOGGING: boolean;
    MIGRATIONS_RUN: boolean;
    ENTITIES: string[];
    MIGRATIONS: string[];
    MIGRATIONS_DIR: string;
  };
  BCRYPT: {
    SALT: number;
  };
  JWT: {
    SECRET_KEY: string;
    ACCESS_EXP: string;
    REFRESH_EXP: string;
    ALGORITHM: Algorithm;
    ISS: string;
    SUB: string;
  };
  REDIS: {
    HOST: string;
    PORT: number;
  };
}