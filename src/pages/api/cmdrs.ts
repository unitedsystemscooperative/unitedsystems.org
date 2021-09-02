import { IAmbassador, ICMDR, IGuest, IMember } from 'models/admin/cmdr';
import { Rank } from 'models/admin/ranks';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import {
  connectToDatabase,
  getItems,
  insertItem,
  updateItem,
} from 'utils/mongo';

const determineCMDRisAmbassador = (cmdr: ICMDR): cmdr is IAmbassador =>
  cmdr.rank === Rank.Ambassador;
const determineCMDRisGuest = (cmdr: ICMDR): cmdr is IGuest =>
  cmdr.rank === Rank.Guest;
const determineCMDRisMember = (cmdr: ICMDR): cmdr is IMember =>
  cmdr.rank >= Rank.FleetAdmiral && cmdr.rank <= Rank.Reserve;

const COLLECTION = 'cmdrs';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);

    const cmdr: IAmbassador | IGuest | IMember = req.body;

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        if (determineCMDRisMember(cmdr))
          cmdr.joinDate = new Date(cmdr.joinDate);
        cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);
        await insertItem(COLLECTION, cmdr, db);

        res.status(200).end();

        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const updateResult = await updateItem(COLLECTION, cmdr, db);
        if (updateResult) res.status(200).end();
        else res.status(500).send(`Failed to update id: ${req.body._id}`);

        break;
      case 'DELETE':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const idtoDelete = req.query['id'] as string;
        const partialCmdr: Partial<IAmbassador | IGuest | IMember> = {
          _id: idtoDelete,
          isDeleted: true,
        };

        const deleteResult = await updateItem(COLLECTION, partialCmdr, db);

        if (deleteResult) res.status(200).end();
        else res.status(500).send(`Failed to update id: ${req.body._id}`);
        break;
      case 'GET':
      default:
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const result = await getItems<IAmbassador | IGuest | IMember>(
          COLLECTION,
          db,
          'cmdrName',
          1
        );

        const members: IMember[] = result.filter((x) =>
          determineCMDRisMember(x)
        ) as IMember[];
        const guests: IGuest[] = result.filter((x) =>
          determineCMDRisGuest(x)
        ) as IGuest[];
        const ambassadors: IAmbassador[] = result.filter((x) =>
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
