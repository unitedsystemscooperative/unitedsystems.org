import { System } from '@/app/about/_models/system';
import { generateDelete } from '../_common/delete';
import { generateGet } from '../_common/get';
import { generatePost } from '../_common/post';
import { generatePut } from '../_common/put';
import { COLLECTION, getSystems } from './systems-api-utils';

const GET = generateGet(getSystems);
const POST = generatePost<System>(COLLECTION);
const PUT = generatePut<System>(COLLECTION);
const DELETE = generateDelete(COLLECTION);

export { DELETE, GET, POST, PUT };
