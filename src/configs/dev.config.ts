import { CONFIG_TYPES } from './config.type';

export const development: CONFIG_TYPES = {
  APP: {
    PORT: 8000,
    CORS_ALLOWED_ORIGINS: ['*'],
  },
  DATABASE: {
    TYPE: 'postgres',
    HOST: 'localhost',
    PORT: 5432,
    USERNAME: 'postgres',
    PASSWORD: 'root',
    DATABASE: 'shopping-list-app',
    ENTITIES: ['dist/**/*.entity{.ts,.js}'],
    SYNCHRONIZE: false,
    LOGGING: true,
    MIGRATIONS: ['dist/migrations/*.js'],
    MIGRATIONS_RUN: false,
    MIGRATIONS_DIR: 'migrations',
  },
  BCRYPT: {
    SALT: 10,
  },
  JWT: {
    SECRET_KEY: process.env.JWT_SECRET_KEY || 'o5XpTBetGW',
    ACCESS_EXP: process.env.JWT_ACCESS_EXP || '1h',
    REFRESH_EXP: process.env.JWT_REFRESH_EXP || '10d',
    ALGORITHM: 'HS256',
    ISS: 'Test App Team',
    SUB: 'Authorization & Authentication',
  },
  REDIS: {
    HOST: 'localhost',
    PORT: 6379,
  },
};