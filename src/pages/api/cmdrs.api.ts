import { IAmbassador, ICMDR, ICMDRs, IGuest, IMember } from 'models/admin/cmdr';
import { Rank } from 'models/admin/ranks';
import { Db } from 'mongodb4';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase, getItems, insertItem, updateItem } from 'utils/mongo';

const determineCMDRisAmbassador = (cmdr: ICMDR): cmdr is IAmbassador =>
  cmdr.rank === Rank.Ambassador;
const determineCMDRisGuest = (cmdr: ICMDR): cmdr is IGuest => cmdr.rank === Rank.Guest;
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

        if (determineCMDRisMember(cmdr)) cmdr.joinDate = new Date(cmdr.joinDate);
        cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);
        await insertItem(COLLECTION, cmdr, db);

        res.status(200).end();

        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        if (determineCMDRisMember(cmdr)) cmdr.joinDate = new Date(cmdr.joinDate);
        cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);

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
        const result = await getCmdrs(db);

        res.status(200).send(result);
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

export const getCmdrs = async (db: Db): Promise<ICMDRs> => {
  const items = await getItems<IAmbassador | IGuest | IMember>(COLLECTION, db, 'cmdrName', 1);
  const newItems = items.map((x) => {
    x._id = x._id.toString();
    return x;
  });

  const members: IMember[] = newItems.filter((x) => determineCMDRisMember(x)) as IMember[];
  const guests: IGuest[] = newItems.filter((x) => determineCMDRisGuest(x)) as IGuest[];
  const ambassadors: IAmbassador[] = newItems.filter((x) =>
    determineCMDRisAmbassador(x)
  ) as IAmbassador[];

  return { members, guests, ambassadors };
};
