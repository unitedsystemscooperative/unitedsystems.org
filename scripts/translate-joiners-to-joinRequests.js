/* eslint-disable @typescript-eslint/no-var-requires */
const mongodb = require('mongodb');
const { ObjectId } = require('bson');
require('dotenv').config();

const translateJoinerstoJoinRequests = async () => {
  const localConString = 'mongodb://localhost:27017';
  const localClient = await mongodb.MongoClient.connect(localConString);
  const localDb = localClient.db('usc');
  const cursor = localDb.collection('joiners').find();
  const array = await cursor.toArray();
  await cursor.close();

  console.log(array.length);

  for (const cmdr of array) {
    console.log({ cmdr });
    // Platforms
    const platforms = cmdr.platforms;
    if (platforms) {
      let platform = 0;
      if (platforms.pc === true) platform = 0;
      else if (platforms.xbox === true) platform = 1;
      else if (platforms.ps === true) platform = 2;
      delete cmdr.platforms;
      cmdr.platform = platform;
    }

    // TimeStamp to date format
    cmdr.timeStamp = new Date(cmdr.timeStamp);

    // Reference to enum
    if (cmdr.reference) {
      switch (cmdr.reference) {
        case 'reddit':
          cmdr.referral = 8;
          break;
        case 'inara':
          cmdr.referral = 7;
          break;
        case 'player':
          cmdr.referral = 1;
          break;
        case 'facebook':
          cmdr.referral = 4;
          break;
        case 'website':
          cmdr.referral = 5;
          break;
        case 'forums':
          cmdr.referral = 3;
          break;
        case 'other':
          cmdr.referral = 9;
          break;
        default:
          cmdr.referral = 9;
          break;
      }
      delete cmdr.reference;
    }

    if (cmdr.reference2) {
      cmdr.referral2 = cmdr.reference2;
      delete cmdr.reference2;
    }

    console.log({ cmdrUpdated: cmdr });
    const id = new ObjectId(cmdr._id);
    delete cmdr._id;
    const result = await localDb.collection('joinRequests').updateOne(
      { _id: id },
      {
        $set: { ...cmdr },
        $unset: { reference: '', reference2: '', platforms: '' },
      },
      { upsert: false }
    );
    console.log(result.modifiedCount);
  }

  console.log('done');
};

translateJoinerstoJoinRequests();
