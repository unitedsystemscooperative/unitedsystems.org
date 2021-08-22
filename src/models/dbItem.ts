import { ObjectId } from 'bson';

export interface IDbItem {
  _id?: ObjectId | string;
}
