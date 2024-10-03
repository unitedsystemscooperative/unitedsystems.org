import { IAlly } from '@/about/_models/ally';
import { generateDelete } from '../_common/delete';
import { generateGet } from '../_common/get';
import { generatePost } from '../_common/post';
import { generatePut } from '../_common/put';
import { COLLECTION, getAllies } from './allies-api-utils';

const GET = generateGet(getAllies);
const POST = generatePost<IAlly>(COLLECTION);
const PUT = generatePut<IAlly>(COLLECTION);
const DELETE = generateDelete(COLLECTION);

export { DELETE, GET, POST, PUT };
