import { Db, MongoClient } from 'mongodb';

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
