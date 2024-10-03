import { IFleetCarrier } from '@/about/_models/fleetCarrier';
import { generateDelete } from '../_common/delete';
import { generateGet } from '../_common/get';
import { generatePost } from '../_common/post';
import { generatePut } from '../_common/put';
import { COLLECTION, getFCs } from './fc-api-utils';

const GET = generateGet(getFCs);
const POST = generatePost<IFleetCarrier>(COLLECTION);
const PUT = generatePut<IFleetCarrier>(COLLECTION);
const DELETE = generateDelete(COLLECTION);

export { DELETE, GET, POST, PUT };
