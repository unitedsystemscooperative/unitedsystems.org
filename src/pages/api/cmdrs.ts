import { ObjectID } from 'bson';
import { ICMDR } from 'models/admin/cmdr';
import { UpdateOneOptions } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase } from 'utils/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);

    const cmdr: ICMDR = req.body;
    // console.log(req.body);

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const response = await db.collection('cmdrs').insertOne(cmdr);

        res.json(response.ops);
        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const id = new ObjectID(cmdr._id);
        const {
          cmdrName,
          discordName,
          joinDate,
          discordJoinDate,
          platform,
          rank,
          isInInaraSquad,
          region,
          ref1,
          ref2,
          notes,
          promotion,
          entersVoice,
          inaraLink,
          email,
          isDeleted,
        } = cmdr;
        const updateDoc = {
          $set: {
            cmdrName,
            discordName,
            joinDate,
            discordJoinDate,
            platform,
            rank,
            isInInaraSquad,
            region,
            ref1,
            ref2,
            notes,
            promotion,
            entersVoice,
            inaraLink,
            email,
            isDeleted,
          },
        };
        const options: UpdateOneOptions = { upsert: false };

        const updateResponse = await db
          .collection('cmdrs')
          .updateOne({ _id: id }, updateDoc, options);

        if (updateResponse.result.nModified > 0) {
          res.status(200).json(updateResponse.result);
        } else {
          res.status(500).send(`Failed to update id: ${req.body._id}`);
        }
        break;
      case 'DELETE':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const idtoDelete = req.query['id'] as string;
        await db
          .collection('cmdrs')
          .deleteOne({ _id: new ObjectID(idtoDelete) });
        res.status(200).end();
        break;
      case 'GET':
      default:
        const cursor = db.collection('cmdrs').find({}).sort({ cmdrName: 1 });
        const systems = await cursor.toArray();
        cursor.close();

        res.status(200).json(systems);
        break;
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
