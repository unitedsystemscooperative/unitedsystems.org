/* eslint-disable @typescript-eslint/no-var-requires */
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
// const { ObjectID } = require('bson');

// interface ICMDR {
//   _id: ObjectId;
//   cmdrName: string;
// }

// interface IBuildInfov2 {
//   _id: ObjectId;
//   shipId: string;
//   title: string;
//   specializations: string[];
//   buildLink: string;
//   engLevel: number;
//   hasGuardian: boolean;
//   hasPowerplay: boolean;
//   isBeginner: boolean;
//   author: string;
//   authorId?: string;
//   isVariant: boolean;
//   variants: string[];
//   related: string[];
//   description: string;
//   jsonBuild: string;
// }

/**
 * Goes through the CMDR database and adds their id to builds that name them as author.
 */
const batchSetAuthorId = async () => {
  const connString = process.env.MONGODB_URI;
  const atlasClient = await MongoClient.connect(connString);
  const db = atlasClient.db('usc');

  const cmdrsCursor = db.collection('cmdrs').find({}).sort({ cmdrName: 1 });
  const cmdrs = await cmdrsCursor.toArray();
  await cmdrsCursor.close();

  const buildsCursor = db
    .collection('shipBuildsv2')
    .find({ authorId: { $exists: false } })
    .sort({ author: 1 });
  const builds = await buildsCursor.toArray();
  await buildsCursor.close();

  for (const build of builds) {
    const author = build.author;
    const cmdr = cmdrs.find((x) => x.cmdrName.toLowerCase().trim() === author.toLowerCase().trim());
    if (cmdr) {
      const authorId = cmdr._id.toHexString();
      try {
        const response = await db
          .collection('shipBuildsv2')
          .updateOne({ _id: build._id }, { $set: { authorId } }, { upsert: false });
        if (response.modifiedCount < 1) throw new Error();
        console.log(`${build.title} updated`);
      } catch (e) {
        console.error(e);
        console.log(`${build.title} not updated`);
      }
    }
    console.log(`No cmdr found for build`);
    console.log({ author, title: build.title });
  }

  atlasClient.close();
};

batchSetAuthorId();
