import { Add } from '@mui/icons-material';
import { AppBar, Collapse, Tab, Tabs, Typography } from '@mui/material';
import { useContext } from 'react';
import { MassacreContext } from '~/massacre/providers/massacreTrackerProvider';
import { MassacreAddTab } from './massacreAddTab';
import { MassacreTrackerTab } from './massacreTrackerTab';

export const MassacreTabs = () => {
  const context = useContext(MassacreContext);

  const handleTabChange = (_: never, newValue: string) => {
    context?.setSelectedTab(newValue);
  };

  if (context === null) {
    return <Typography>Unable to retrieve context</Typography>;
  } else {
    return (
      <div className="root">
        <AppBar position="static" color="default" sx={{ px: 2 }}>
          <Tabs value={context.selectedTab} onChange={handleTabChange}>
            {context.trackers.map((tracker) => (
              <Tab
                key={tracker.hazRezSystem}
                label={tracker.hazRezSystem}
                value={tracker.hazRezSystem}
                data-testid={`massacretab-${tracker.hazRezSystem}`}
              />
            ))}
            <Tab icon={<Add />} value="+" data-testid="massacretab-add" />
          </Tabs>
        </AppBar>
        {context.trackers.map((tracker) => (
          <Collapse
            in={tracker.hazRezSystem === context.selectedTab}
            key={tracker.hazRezSystem}
            unmountOnExit
            mountOnEnter>
            <div>
              <MassacreTrackerTab system={tracker.hazRezSystem} />
            </div>
          </Collapse>
        ))}
        <Collapse in={context.selectedTab === '+'} unmountOnExit mountOnEnter>
          <div>
            <MassacreAddTab />
          </div>
        </Collapse>
      </div>
    );
  }
};
