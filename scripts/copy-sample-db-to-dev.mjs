import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

/**
 * This copies the sample data from .sample-database-data to the localhost mongodb usc database.
 */
const copySampleDatatoDevDb = async () => {
  const connString = 'mongodb://localhost:27017/usc';
  const client = await MongoClient.connect(connString);
  const db = client.db();

  const files = fs
    .readdirSync(path.join(process.cwd(), '.sample-database-data'))
    .filter((x) => x.endsWith('.json'));

  for (const file of files) {
    console.log('processing', file);
    const collection = db.collection(
      file.substring(file.lastIndexOf('/') + 1).replace('.json', '')
    );
    const fileContents = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), '.sample-database-data', file), 'utf-8')
    );
    await collection.insertMany(fileContents);
    console.log('processed', file);
  }

  console.log('copy completed');
};

await copySampleDatatoDevDb();
