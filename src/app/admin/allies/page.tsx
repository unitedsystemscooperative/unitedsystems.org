import { AllyDashboard } from '@/admin/allies/_components/allyDashboard';
import { getAllies } from '@/api/allies/allies-api-utils';
import { runAdminAuthCheck } from 'utils/auth-check';
import { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { addAlly, updateAlly, deleteAlly } from './actions';

export const metadata: Metadata = {
  title: 'USC | Allies Management',
};

const getData = unstable_cache(async () => await getAllies(), ['allies'], {
  revalidate: 3600,
  tags: ['allies'],
});

export default async function AlliesManagementPage() {
  await runAdminAuthCheck('admin_allies');
  const data = await getData();
  return (
    <>
      <AllyDashboard
        allies={data}
        addAllyAction={addAlly}
        updateAllyAction={updateAlly}
        deleteAllyAction={deleteAlly}
      />
    </>
  );
}
