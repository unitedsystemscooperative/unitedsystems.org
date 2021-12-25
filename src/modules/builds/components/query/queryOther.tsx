import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import { styled, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { OtherFilters } from 'models/builds/otherFilters';
import { MouseEvent } from 'react';
import { QuerySection, QuerySectionHeader } from './sharedComponents';

const ButtonGrid = styled('div')(({ theme }) => ({
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
}));

export const QueryOther = (props: { other: OtherFilters; setOther: (value: OtherFilters) => void }) => {
  const { other, setOther } = props;

  const handleGuardianChange = (_: MouseEvent<HTMLElement>, newValue: number) => {
    setOther({ ...other, guardian: newValue });
  };
  const handlePowerPlayChange = (_: MouseEvent<HTMLElement>, newValue: number) => {
    setOther({ ...other, powerplay: newValue });
  };
  const handleBeginnerChange = (_: MouseEvent<HTMLElement>, newValue: number) => {
    setOther({ ...other, beginner: newValue });
  };

  return (
    <QuerySection sx={{ gridArea: 'other' }}>
      <QuerySectionHeader>Other Filters</QuerySectionHeader>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <Tooltip title="Should the build have Guardian components?" arrow>
          <ButtonGrid>
            <label>Guardian</label>
            <ToggleButtonGroup value={other.guardian} exclusive onChange={handleGuardianChange}>
              <ToggleButton value={1}>
                <CheckIcon />
              </ToggleButton>
              <ToggleButton value={0}>
                <BlockIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonGrid>
        </Tooltip>
        <Tooltip title="Does the build have Power Play modules?" arrow>
          <ButtonGrid>
            <label>Power Play</label>
            <ToggleButtonGroup value={other.powerplay} exclusive onChange={handlePowerPlayChange}>
              <ToggleButton value={1}>
                <CheckIcon />
              </ToggleButton>
              <ToggleButton value={0}>
                <BlockIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonGrid>
        </Tooltip>
        <Tooltip title="Is this build easy to achieve early-game?" arrow>
          <ButtonGrid
            sx={{
              borderWidth: '3px',
              borderStyle: 'solid',
              borderColor: 'secondary.main',
              borderRadius: '5px',
            }}>
            <label>Beginner</label>
            <ToggleButtonGroup value={other.beginner} exclusive onChange={handleBeginnerChange}>
              <ToggleButton value={1}>
                <CheckIcon />
              </ToggleButton>
              <ToggleButton value={0}>
                <BlockIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonGrid>
        </Tooltip>
      </div>
    </QuerySection>
  );
};
