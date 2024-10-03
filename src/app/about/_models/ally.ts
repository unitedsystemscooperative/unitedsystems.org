import { WithStringId } from 'utils/db';

interface Ally {
  name: string;
}

export type IAlly = WithStringId<Ally>;
