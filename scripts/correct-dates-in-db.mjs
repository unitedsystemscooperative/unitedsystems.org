/* eslint-disable @typescript-eslint/no-var-requires */
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// interface ICMDR {
//   _id: ObjectId;
//   cmdrName: string;
//   rank: Rank;
//   joinDate?: string | Date;
//   discordJoinDate?: string | Date;
// }

// enum Rank {
//   FleetAdmiral,
//   ViceAdmiral,
//   Commodore,
//   Captain,
//   LtCommander,
//   Lieutenant,
//   Ensign,
//   Cadet,
//   Reserve,
//   Ambassador,
//   Guest,
// }

/**
 * Goes through the CMDR database and adds their id to builds that name them as author.
 */
const batchFixDates = async () => {
  const connString = process.env.MONGODB_URI;
  const atlasClient = await MongoClient.connect(connString);
  const db = atlasClient.db('usc');

  const cmdrsCursor = db
    .collection('cmdrs2')
    .find({
      $and: [
        { discordJoinDate: { $type: 'date' } },
        { joinDate: { $type: 'null' } },
        { rank: { $lt: 9 } },
      ],
    })
    .sort({ cmdrName: 1 });
  const cmdrs = await cmdrsCursor.toArray();
  await cmdrsCursor.close();

  for (const cmdr of cmdrs) {
    const discordJoinDate = cmdr.discordJoinDate;

    const newJoinDate = new Date(discordJoinDate);

    const response = await db.collection('cmdrs2').updateOne(
      { _id: cmdr._id },
      {
        $set: {
          joinDate: newJoinDate,
        },
      },
      { upsert: false }
    );

    if (response.modifiedCount === 1) console.log({ status: 'updated', cmdr: cmdr.cmdrName });
    else console.log({ status: 'not updated', cmdr: cmdr.cmdrName });
  }

  atlasClient.close();
};

batchFixDates();
