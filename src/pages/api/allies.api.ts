import { deleteItem, getItems, insertItem, updateItem } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { IAlly } from '@/app/about/_models/ally';
import { NextApiRequest, NextApiResponse } from 'next';

const COLLECTION = 'allies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isHC = await getIsHC(req);

    const ally: IAlly = req.body;

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        await insertItem(COLLECTION, ally);

        res.status(200).end();

        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const updateResult = await updateItem(COLLECTION, ally);
        if (updateResult) res.status(200).end();
        else res.status(500).send(`Failed to update id: ${req.body._id}`);

        break;
      case 'DELETE':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        await deleteItem(COLLECTION, req.query['id'] as string);
        res.status(200).end();
        break;
      case 'GET':
      default:
        const result = await getAllies();

        res.status(200).send(result);
        break;
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const getAllies = async () => {
  const items = await getItems<IAlly>(COLLECTION, 'name', 1);
  return items.map((x) => {
    x._id = x._id.toString();
    return x;
  });
};
