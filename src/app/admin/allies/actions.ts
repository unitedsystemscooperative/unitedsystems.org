'use server';

import { IAlly } from '@/about/_models/ally';
import { COLLECTION } from '@/api/allies/allies-api-utils';
import { auth } from 'auth';
import { getIsHC } from 'utils/auth-check';
import { deleteItem, insertItem, updateItem } from 'utils/db';
import { revalidateTag } from 'next/cache';

export async function addAlly(ally: IAlly): Promise<void> {
  const session = await auth();
  const isHC = await getIsHC(session);

  if (!isHC) {
    throw new Error('Must be authorized to perform this action');
  }

  await insertItem(COLLECTION, ally);
  revalidateTag('allies');
}

export async function updateAlly(ally: IAlly): Promise<void> {
  const session = await auth();
  const isHC = await getIsHC(session);

  if (!isHC) {
    throw new Error('Must be authorized to perform this action');
  }
  await updateItem(COLLECTION, ally);
  revalidateTag('allies');
}
export async function deleteAlly(ally: IAlly): Promise<void> {
  const session = await auth();
  const isHC = await getIsHC(session);

  if (!isHC) {
    throw new Error('Must be authorized to perform this action');
  }

  await deleteItem(COLLECTION, ally._id);
  revalidateTag('allies');
}
