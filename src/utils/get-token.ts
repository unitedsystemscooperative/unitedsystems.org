import { IMember } from 'models/auth/member';
import jwt from 'next-auth/jwt';

const secret = process.env.AUTH_SECRET;

export const getToken = async (req) => {
  const token = (await jwt.getToken({ req, secret })) as IMember;
  return token;
};
