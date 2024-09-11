import { getItems, insertItem, updateItem } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { IAmbassador, ICMDR, ICMDRs, IGuest, IMember, Rank } from '@@/admin/models';
import { WithId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const determineCMDRisAmbassador = (cmdr: ICMDR): cmdr is IAmbassador =>
  cmdr.rank === Rank.Ambassador;
const determineCMDRisGuest = (cmdr: ICMDR): cmdr is IGuest => cmdr.rank === Rank.Guest;
const determineCMDRisMember = (cmdr: ICMDR): cmdr is IMember =>
  cmdr.rank >= Rank.FleetAdmiral && cmdr.rank <= Rank.Reserve;

const COLLECTION = 'cmdrs';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isHC = await getIsHC(req);

    const cmdr: IAmbassador | IGuest | IMember = req.body;

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        if (determineCMDRisMember(cmdr)) cmdr.joinDate = new Date(cmdr.joinDate);
        cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);
        await insertItem(COLLECTION, cmdr);

        res.status(200).end();

        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        if (determineCMDRisMember(cmdr)) cmdr.joinDate = new Date(cmdr.joinDate);
        cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);

        const updateResult = await updateItem(COLLECTION, cmdr);
        if (updateResult) res.status(200).end();
        else res.status(500).send(`Failed to update id: ${req.body._id}`);

        break;
      case 'DELETE':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const idtoDelete = req.query['id'] as string;
        const partialCmdr: WithId<Partial<IAmbassador | IGuest | IMember>> = {
          _id: idtoDelete,
          isDeleted: true,
        };

        const deleteResult = await updateItem(COLLECTION, partialCmdr);

        if (deleteResult) res.status(200).end();
        else res.status(500).send(`Failed to update id: ${req.body._id}`);
        break;
      case 'GET':
      default:
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        const result = await getCmdrs();

        res.status(200).send(result);
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

export const getCmdrs = async (): Promise<ICMDRs> => {
  const items = await getItems<IAmbassador | IGuest | IMember>(COLLECTION, 'cmdrName', 1);
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
