import { AdminDashboard } from '@/admin/_components/adminDashboard';
import { runAdminAuthCheck } from 'utils/auth-check';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Administration',
  description: 'USC Administration Tools',
};

export default async function AdminPage() {
  await runAdminAuthCheck('admin_index');
  return (
    <>
      <AdminDashboard />
    </>
  );
}
