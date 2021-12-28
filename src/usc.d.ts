import { Db, MongoClient } from 'mongodb';
import { Theme } from '@mui/material';

declare global {
  namespace NodeJS {
    interface Global {
      mongo: { _mongoClientPromise: Promise<MongoClient> };
    }
  }
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
