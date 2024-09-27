import { ICMDR, IAmbassador, Rank, IGuest, IMember, ICMDRs } from '@/app/admin/_models';
import { getItems } from '@/utils/db';

export const determineCMDRisAmbassador = (cmdr: ICMDR): cmdr is IAmbassador =>
  cmdr.rank === Rank.Ambassador;
export const determineCMDRisGuest = (cmdr: ICMDR): cmdr is IGuest => cmdr.rank === Rank.Guest;
export const determineCMDRisMember = (cmdr: ICMDR): cmdr is IMember =>
  cmdr.rank >= Rank.FleetAdmiral && cmdr.rank <= Rank.Reserve;

export const COLLECTION = 'cmdrs';

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
