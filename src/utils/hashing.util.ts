import * as bcrypt from 'bcryptjs';
import CONFIG from '@config';
const { SALT } = CONFIG.BCRYPT;

export const createHash = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT);
  return bcrypt.hash(value, salt);
};

export const compareHash = (
  value: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(value, hash);
};
