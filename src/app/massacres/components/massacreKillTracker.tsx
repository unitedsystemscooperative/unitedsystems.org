'use client';
import { MassacreContextProvider } from '@/app/massacres/providers/massacreTrackerProvider';
import { MassacreTabSystem } from './massacreTabSystem';

export const MassacreKillTracker = () => {
  return (
    <MassacreContextProvider>
      <MassacreTabSystem />
    </MassacreContextProvider>
  );
};
