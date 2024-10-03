import { WithStringId } from 'utils/db';

interface ISystem {
  name: string;
  inaraLink?: string;
  isControlled: boolean;
}

export type System = WithStringId<ISystem>;
