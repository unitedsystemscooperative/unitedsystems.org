import { ObjectID } from 'bson';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'utils/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    switch (req.method) {
      case 'POST':
        const response = await db
          .collection('shipBuildsv2')
          .insertOne(req.body);

        res.json(response.ops);
        break;
      case 'PUT':
        console.log(req.body);
        const idToUpdate = new ObjectID(req.body.id);
        const updateDoc = { $set: req.body.updateDoc };
        const options = { upsert: false };

        const updateResult = await db
          .collection('shipBuildsv2')
          .updateOne({ _id: idToUpdate }, updateDoc, options);

        if (updateResult.result.nModified > 0) {
          res.status(200).json(updateResult.result);
        } else {
          res.status(500).send(`Failed to update id: ${req.body.id}`);
        }

        break;
      case 'GET':
      default:
        const builds = await db
          .collection('shipBuildsv2')
          .find({})
          .sort({ shipId: 1 })
          .toArray();

        res.status(200).json(builds);
        break;
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
