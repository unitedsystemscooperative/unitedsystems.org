import { MassacreContext } from '~/massacre/providers/massacreTrackerProvider';
import { AppBar, Collapse, Tab, Tabs, Typography } from '@mui/material';
import { ChangeEvent, useContext } from 'react';
import { MassacreAddTab } from './massacreAddTab';
import { MassacreTrackerTab } from './massacreTrackerTab';
import { Add } from '@mui/icons-material';

export const MassacreTabs = () => {
  const context = useContext(MassacreContext);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleTabChange = (_: ChangeEvent<{}>, newValue: string) => {
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
