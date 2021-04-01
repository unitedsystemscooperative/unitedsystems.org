import { ObjectId, ObjectID } from 'bson';
import { IAlly } from 'models/about/ally';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase } from 'utils/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);

    const ally: IAlly = req.body;
    // console.log(req.body);

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const response = await db.collection('allies').insertOne(ally);

        res.json(response.ops);
        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const id = new ObjectID(ally._id);
        const updateDoc = {
          $set: {
            name: ally.name,
          },
        };
        const options = { upsert: false };

        const updateResponse = await db
          .collection('allies')
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
          .collection('allies')
          .deleteOne({ _id: new ObjectId(idtoDelete) });
        res.status(200).end();
        break;
      case 'GET':
      default:
        const cursor = db.collection('allies').find({}).sort({ name: 1 });
        const allies = await cursor.toArray();
        cursor.close();

        res.status(200).json(allies);
        break;
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
