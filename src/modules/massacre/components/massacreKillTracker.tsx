import { MassacreContextProvider } from '~/massacre/providers/massacreTrackerProvider';
import { MassacreTabs } from './massacreTabs';

export const MassacreKillTracker = () => {
  return (
    <MassacreContextProvider>
      <MassacreTabs />
    </MassacreContextProvider>
  );
};
