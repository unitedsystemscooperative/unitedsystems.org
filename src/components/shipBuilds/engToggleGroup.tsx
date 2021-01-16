import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles, Tooltip } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import engineerIcon from 'assets/shipBuilds/Engineer_icon.svg';

interface IEngToggleGroupProps {
  handleEngLevelChange: (_: MouseEvent<HTMLElement>, newValue: number) => void;
  engLevel: number | null;
}

const useStyles = makeStyles({
  engButton: {
    display: 'flex',
    '& img': {
      height: '20px',
      width: '20px',
    },
  },
});

export const EngToggleGroup = (props: IEngToggleGroupProps) => {
  const { engLevel, handleEngLevelChange } = props;
  const classes = useStyles();

  return (
    <ToggleButtonGroup
      value={engLevel}
      exclusive
      onChange={handleEngLevelChange}
    >
      <ToggleButton value={0}>
        <Tooltip title="No Engineering" arrow>
          <div className={classes.engButton}>
            <BlockIcon />
          </div>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={1}>
        <Tooltip title="Simple Engineering" arrow>
          <div className={classes.engButton}>
            <img src={engineerIcon} alt="engineeringIcon" />
          </div>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={2}>
        <Tooltip title="Moderate Engineering" arrow>
          <div className={classes.engButton}>
            <img src={engineerIcon} alt="engineeringIcon" />
            <img src={engineerIcon} alt="engineeringIcon" />
          </div>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={3}>
        <Tooltip title="End-Game/Extreme Engineering" arrow>
          <div className={classes.engButton}>
            <img src={engineerIcon} alt="engineeringIcon" />
            <img src={engineerIcon} alt="engineeringIcon" />
            <img src={engineerIcon} alt="engineeringIcon" />
          </div>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
