import { ObjectID } from 'bson';
import { IBuildInfov2 } from 'models/builds';
import { UpdateQuery } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import { getUserId } from 'utils/get-userId';
import { connectToDatabase } from 'utils/mongo';

const COLLECTION = 'shipBuildsv2';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);
    const userId = await getUserId(req, db);

    switch (req.method) {
      case 'POST':
        const newBuild: IBuildInfov2 = { ...req.body };
        if (userId) {
          newBuild.authorId = userId;
        }
        const response = await db.collection(COLLECTION).insertOne(newBuild);

        res.json(response.ops);
        break;
      case 'PUT':
        if (req.body.updateDoc['title']) {
          const authorId = req.body.updateDoc['authorId'] as string;
          if (authorId !== userId && !isHC) {
            res.status(401).send('unauthorized');
            return;
          }
        }
        const idToUpdate = new ObjectID(req.body.id);
        let updateDoc: UpdateQuery<IBuildInfov2> | Partial<IBuildInfov2>;
        if (req.body.updateDoc['title']) {
          const updateBuild: IBuildInfov2 = { ...req.body.updateDoc };
          // have to delete _id as Mongo will reject if it is in the updateDoc.
          delete updateBuild._id;
          updateDoc = {
            $set: updateBuild,
          };
        } else updateDoc = { $set: req.body.updateDoc };
        const options = { upsert: false };

        const updateResult = await db
          .collection(COLLECTION)
          .updateOne({ _id: idToUpdate }, updateDoc, options);

        console.log(updateResult);
        if (updateResult.result.nModified > 0) {
          res.status(200).json(updateResult.result);
        } else {
          res.status(500).send(`Failed to update id: ${req.body.id}`);
        }

        break;
      case 'DELETE':
        const idtoDelete = req.query['id'] as string;
        const authorId = req.query['authorId'] as string;
        if (authorId !== userId && !isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        await db
          .collection(COLLECTION)
          .deleteOne({ _id: new ObjectID(idtoDelete) });
        res.status(200).end();
        break;
      case 'GET':
      default:
        const cursor = db.collection(COLLECTION).find({}).sort({ shipId: 1 });
        const builds = await cursor.toArray();
        await cursor.close();

        res.status(200).json(builds);
        break;
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};
