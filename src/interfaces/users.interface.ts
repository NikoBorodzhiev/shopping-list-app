import { Roles } from '@enums';

export class ICreateUser {
  name: string;
  email: string;
  role: Roles;
  password: string;
}