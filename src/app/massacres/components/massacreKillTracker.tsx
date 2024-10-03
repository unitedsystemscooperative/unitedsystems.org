'use client';
import { MassacreContextProvider } from '@/massacres/providers/massacreTrackerProvider';
import { MassacreTabSystem } from './massacreTabSystem';

export const MassacreKillTracker = () => {
  return (
    <MassacreContextProvider>
      <MassacreTabSystem />
    </MassacreContextProvider>
  );
};
