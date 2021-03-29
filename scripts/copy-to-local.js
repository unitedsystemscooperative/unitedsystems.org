/* eslint-disable @typescript-eslint/no-var-requires */
const mongodb = require('mongodb');

const dotenv = require('dotenv');
dotenv.config();

const copyToLocal = async () => {
  const atlasConString = process.env.MONGODB_URI;
  const localConString = 'mongodb://localhost:27017';

  const atlasClient = await mongodb.MongoClient.connect(atlasConString);
  const atlasDB = atlasClient.db('usc');

  const localClient = await mongodb.MongoClient.connect(localConString);
  const localDB = localClient.db('usc');

  const collections = await atlasDB.collections();

  for (const collection of collections) {
    const name = collection.collectionName;
    console.log('Collection: ', name);
    const newCollection = await localDB.createCollection(name);

    const cursor = collection.find({});
    const docs = await cursor.toArray();
    cursor.close();

    await newCollection.insertMany(docs);
    console.log('successful writing of collection: ', name);
  }

  await atlasClient.close();
};

copyToLocal();
