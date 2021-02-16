import { Roles } from '@enums';

export interface ITokenPayload {
  id: string,
  email: string;
  role: Roles;
}