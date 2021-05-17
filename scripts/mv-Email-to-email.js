/* eslint-disable @typescript-eslint/no-var-requires */
const mongodb = require('mongodb');
// import mongodb from 'mongodb';

const dotenv = require('dotenv');
dotenv.config();

const mvField = async () => {
  const localConString = 'mongodb://localhost:27017';

  const localClient = await mongodb.MongoClient.connect(localConString);
  const localDB = localClient.db('usc');

  await localDB.collection('cmdrs').updateMany({}, { $rename: { 'Email': 'email' } });
};

mvField();
