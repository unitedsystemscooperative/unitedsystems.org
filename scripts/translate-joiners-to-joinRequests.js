/* eslint-disable @typescript-eslint/no-var-requires */
const mongodb = require('mongodb4');
const { ObjectId } = require('bson');
require('dotenv').config();

const translateJoinerstoJoinRequests = async () => {
  const localConString = 'mongodb://localhost:27017';
  const localClient = await mongodb.MongoClient.connect(localConString);
  const localDb = localClient.db('usc');
  const cursor = localDb.collection('joiners').find();
  const array = await cursor.toArray();
  await cursor.close();

  for (const cmdr of array) {
    // Platforms
    const platforms = cmdr.platforms;
    let platform = 0;
    if (platforms.pc === true) platform = 0;
    else if (platforms.xbox === true) platform = 1;
    else if (platforms.ps === true) platform = 2;
    delete cmdr.platforms;
    cmdr.platform = platform;

    // TimeStamp to date format
    cmdr.timeStamp = new Date(cmdr.timeStamp);

    const id = new ObjectId(cmdr._id);
    await localDb.collection('joinRequests').insertOne({ _id: id, ...cmdr });
  }
};

translateJoinerstoJoinRequests();
