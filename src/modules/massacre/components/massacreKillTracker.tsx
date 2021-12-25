import { MassacreContextProvider } from 'providers/massacreTrackerProvider';
import { MassacreTabSystem } from './massacreTabSystem';

export const MassacreKillTracker = () => {
  return (
    <MassacreContextProvider>
      <MassacreTabSystem />
    </MassacreContextProvider>
  );
};
