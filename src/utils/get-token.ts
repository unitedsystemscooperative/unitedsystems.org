import { IUser } from 'models/auth/user';
import jwt from 'next-auth/jwt';

const secret = process.env.AUTH_SECRET;

export const getToken = async (req) => {
  const token = (await jwt.getToken({ req, secret })) as IUser;
  return token;
};
