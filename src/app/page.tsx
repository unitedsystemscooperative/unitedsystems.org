import { Metadata } from 'next';
import ClientRoot from './_components/client-root';

export const metadata: Metadata = {
  title: 'United Systems Cooperative',
  description: 'Web site of the United Systems Cooperative',
};

export default function RootPage() {
  return <ClientRoot />;
}
