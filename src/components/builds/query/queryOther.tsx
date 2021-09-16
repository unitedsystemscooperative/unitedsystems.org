import { Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { OtherFilters } from 'models/builds/otherFilters';
import { MouseEvent } from 'react';
import { useSharedStyles } from './sharedStyles';

const useStyles = makeStyles((theme) => ({
  queryOtherButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  queryOtherButtonGrids: {
    display: 'grid',
    gridTemplateRows: '0.5fr 1fr',
    margin: theme.spacing(0, 1),
    '& div': {
      margin: 'auto',
      padding: theme.spacing(1),
    },
    '& label': {
      height: '25px',
      padding: theme.spacing(1),
    },
  },
  QueryOtherBeginnerButtons: {
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
    borderRadius: '5px',
  },
}));

export const QueryOther = (props: {
  other: OtherFilters;
  setOther: (value: OtherFilters) => void;
}) => {
  const { other, setOther } = props;
  const sharedClasses = useSharedStyles();
  const classes = useStyles();

  const handleGuardianChange = (
    _: MouseEvent<HTMLElement>,
    newValue: number
  ) => {
    setOther({ ...other, guardian: newValue });
  };
  const handlePowerPlayChange = (
    _: MouseEvent<HTMLElement>,
    newValue: number
  ) => {
    setOther({ ...other, powerplay: newValue });
  };
  const handleBeginnerChange = (
    _: MouseEvent<HTMLElement>,
    newValue: number
  ) => {
    setOther({ ...other, beginner: newValue });
  };
  const handleShowVariantsChange = (
    _: MouseEvent<HTMLElement>,
    checked: boolean
  ) => {
    setOther({ ...other, showVariants: checked });
  };

  return (
    <div className={sharedClasses.querySection}>
      <h3 className={sharedClasses.querySectionheader}>Other Filters</h3>
      <div className={classes.queryOtherButtons}>
        <Tooltip title="Show all builds, including variants" arrow>
          <div className={classes.queryOtherButtonGrids}>
            <label>Show Variants</label>
            <ToggleButtonGroup
              value={other.showVariants}
              exclusive
              onChange={handleShowVariantsChange}
            >
              <ToggleButton value={true}>
                <CheckIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Tooltip>
        <Tooltip title="Should the build have Guardian components?" arrow>
          <div className={classes.queryOtherButtonGrids}>
            <label>Guardian</label>
            <ToggleButtonGroup
              value={other.guardian}
              exclusive
              onChange={handleGuardianChange}
            >
              <ToggleButton value={1}>
                <CheckIcon />
              </ToggleButton>
              <ToggleButton value={0}>
                <BlockIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Tooltip>
        <Tooltip title="Does the build have Power Play modules?" arrow>
          <div className={classes.queryOtherButtonGrids}>
            <label>Power Play</label>
            <ToggleButtonGroup
              value={other.powerplay}
              exclusive
              onChange={handlePowerPlayChange}
            >
              <ToggleButton value={1}>
                <CheckIcon />
              </ToggleButton>
              <ToggleButton value={0}>
                <BlockIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Tooltip>
        <Tooltip title="Is this build easy to achieve early-game?" arrow>
          <div
            className={`${classes.queryOtherButtonGrids} ${classes.QueryOtherBeginnerButtons}`}
          >
            <label>Beginner</label>
            <ToggleButtonGroup
              value={other.beginner}
              exclusive
              onChange={handleBeginnerChange}
            >
              <ToggleButton value={1}>
                <CheckIcon />
              </ToggleButton>
              <ToggleButton value={0}>
                <BlockIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
