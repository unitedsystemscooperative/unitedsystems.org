import { MassacreKillTracker } from '@/app/massacres/components/massacreKillTracker';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC Massacre Mission Tracker',
  description: 'USC Massacre Mission Tracker',
};

export default function MassacrePage() {
  return <MassacreKillTracker />;
}
