import { Db, MongoClient } from 'mongodb';
import { Theme } from '@mui/material';

declare global {
  namespace NodeJS {
    interface Global {
      mongo: {
        conn: { client: MongoClient; db: Db };
        promise: Promise<{ client: MongoClient; db: Db }>;
      };
    }
  }
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
