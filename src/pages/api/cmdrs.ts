import { ObjectID } from 'bson';
import { IAmbassador, ICMDR, IGuest, IMember } from 'models/admin/cmdr';
import { Rank } from 'models/admin/ranks';
import { UpdateOneOptions, UpdateQuery } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase } from 'utils/mongo';

const determineCMDRisAmbassador = (cmdr: ICMDR): cmdr is IAmbassador =>
  cmdr.rank === Rank.Ambassador;
const determineCMDRisGuest = (cmdr: ICMDR): cmdr is IGuest =>
  cmdr.rank === Rank.Guest;
const determineCMDRisMember = (cmdr: ICMDR): cmdr is IMember =>
  cmdr.rank >= Rank.FleetAdmiral && cmdr.rank <= Rank.Reserve;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);

    const cmdr = req.body;
    // console.log(req.body);

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        console.log(cmdr);
        const response = await db.collection('cmdrs').insertOne(cmdr);

        res.json(response.ops);
        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const { _id, ...updateCmdr } = cmdr;
        const id = new ObjectID(_id);
        const updateDoc = {
          $set: {
            ...updateCmdr,
          },
        };
        const options: UpdateOneOptions = { upsert: false };

        console.log({ id });
        console.log(updateDoc);

        const updateResponse = await db
          .collection('cmdrs')
          .updateOne({ _id: id }, updateDoc, options);

        console.log({ updateResponse });

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
        const idtoDelete = new ObjectID(req.query['id'] as string);
        await db
          .collection('cmdrs')
          .updateOne({ _id: idtoDelete }, { $set: { isDeleted: true } });

        res.status(200).end();
        break;
      case 'GET':
      default:
        const cursor = db.collection('cmdrs').find({}).sort({ cmdrName: 1 });
        const cmdrs = await cursor.toArray();
        cursor.close();

        const members: IMember[] = cmdrs.filter((x) =>
          determineCMDRisMember(x)
        ) as IMember[];
        const guests: IGuest[] = cmdrs.filter((x) =>
          determineCMDRisGuest(x)
        ) as IGuest[];
        const ambassadors: IAmbassador[] = cmdrs.filter((x) =>
          determineCMDRisAmbassador(x)
        ) as IAmbassador[];

        res.status(200).json({ members, guests, ambassadors });
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
