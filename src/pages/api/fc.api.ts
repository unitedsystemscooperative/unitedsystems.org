import { deleteItem, getItems, insertItem, updateItem } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { IFleetCarrier } from '@@/about/models/fleetCarrier';
import { NextApiRequest, NextApiResponse } from 'next';

const COLLECTION = 'fleetCarriers';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isHC = await getIsHC(req);

    const carrier: IFleetCarrier = req.body;

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        await insertItem(COLLECTION, carrier);

        res.status(200).end();
        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const updateResult = await updateItem(COLLECTION, carrier);

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
        const results = await getFCs();

        res.status(200).send(results);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const getFCs = async () => {
  const items = await getItems<IFleetCarrier>(COLLECTION, 'name', 1);
  return items;
};
