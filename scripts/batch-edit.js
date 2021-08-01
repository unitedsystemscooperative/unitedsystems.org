/* eslint-disable @typescript-eslint/no-var-requires */
const mongodb = require('mongodb');

const dotenv = require('dotenv');
dotenv.config();
// const { ObjectID } = require('bson');

const batchEdit = async () => {
    const connString = process.env.MONGODB_URI;
    const atlasClient = await mongodb.MongoClient.connect(connString);
    const db = atlasClient.db('usc');

    const response = await db.collection('cmdrs').updateMany({ promotion: -1 }, { $set: { promotion: null } });
    console.log(response.result);
    atlasClient.close();
};

batchEdit();
