/* eslint-disable @typescript-eslint/no-var-requires */
const mongodb = require('mongodb');
// import mongodb from 'mongodb';

const dotenv = require('dotenv');
const { ObjectID } = require('bson');
dotenv.config();

const mvField = async () => {
  const localConString = 'mongodb://localhost:27017';

  const localClient = await mongodb.MongoClient.connect(localConString);
  const localDB = localClient.db('usc');

  const cursor = localDB.collection('cmdrs').find();
  const array = await cursor.toArray();
  await cursor.close();

  for (const cmdr of array) {
    if (cmdr.joinDate) {
      console.log(cmdr.joinDate);
      let date = new Date(cmdr.joinDate);
      if (date.getUTCFullYear() === 3306) {
        date.setFullYear(2020);
      }
      if (date.getUTCFullYear() === 3307) {
        date.setFullYear(2021);
      }
      if (date.getUTCFullYear() === 1970) {
        date = null;
      }

      const id = new ObjectID(cmdr._id);
      await localDB.collection('cmdrs').updateOne({ _id: id }, { $set: { joinDate: date } });
    }
  }

  // await localDB.collection('cmdrs').updateMany({}, { $rename: { 'Email': 'email' } });
};

mvField();
