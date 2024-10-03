import { WithStringId } from 'utils/db';

export type FetchFn<T> = () => Promise<WithStringId<T>[]>;
