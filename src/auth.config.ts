import { NextAuthConfig } from 'next-auth';
import SendGrid from 'next-auth/providers/sendgrid';

export const authConfig: NextAuthConfig = {
  providers: [SendGrid({ from: process.env.EMAIL_FROM })],
};
