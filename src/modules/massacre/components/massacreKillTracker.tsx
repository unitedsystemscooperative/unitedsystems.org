import { MassacreContextProvider } from '~/massacre/providers/massacreTrackerProvider';
import { MassacreTabSystem } from './massacreTabSystem';

export const MassacreKillTracker = () => {
  return (
    <MassacreContextProvider>
      <MassacreTabSystem />
    </MassacreContextProvider>
  );
};
