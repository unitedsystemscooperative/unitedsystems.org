import { ObjectId, ObjectID } from 'bson';
import { System } from 'models/about/system';
import { IMember } from 'models/auth/member';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase } from 'utils/mongo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const session = await getSession({ req });
    const user = await db
      .collection('members')
      .findOne<IMember>({ email: session.user.email });
    const isHC = user && user.role === 'high command' ? true : false;

    const system: System = req.body;
    // console.log(req.body);

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const response = await db.collection('systems').insertOne(system);

        res.json(response.ops);
        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const id = new ObjectID(system._id);
        const updateDoc = {
          $set: {
            name: system.name,
            inaraLink: system.inaraLink,
            isControlled: system.isControlled,
          },
        };
        const options = { upsert: false };

        const updateResponse = await db
          .collection('systems')
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
          .collection('systems')
          .deleteOne({ _id: new ObjectId(idtoDelete) });
        res.status(200).end();
        break;
      case 'GET':
      default:
        const cursor = db.collection('systems').find({}).sort({ name: 1 });
        const systems = await cursor.toArray();
        cursor.close();

        res.status(200).json(systems);
        break;
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
