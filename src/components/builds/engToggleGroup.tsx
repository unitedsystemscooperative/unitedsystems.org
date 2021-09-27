import BlockIcon from '@mui/icons-material/Block';
import {
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import Image from 'next/image';
import { MouseEvent } from 'react';

const engineerIcon = '/img/shipBuilds/Engineer_icon.svg';

interface IEngToggleGroupProps {
  handleEngLevelChange: (_: MouseEvent<HTMLElement>, newValue: number) => void;
  engLevel: number | null;
}

const EngIconSet = styled('div')(() => ({
  display: 'flex',
}));

const EngIcon = () => (
  <Image src={engineerIcon} alt="engineeringIcon" height={20} width={20} />
);

export const EngToggleGroup = (props: IEngToggleGroupProps) => {
  const { engLevel, handleEngLevelChange } = props;

  return (
    <ToggleButtonGroup
      value={engLevel}
      exclusive
      onChange={handleEngLevelChange}
    >
      <ToggleButton value={0}>
        <Tooltip title="No Engineering" arrow>
          <EngIconSet>
            <BlockIcon />
          </EngIconSet>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={1}>
        <Tooltip title="Simple Engineering" arrow>
          <EngIconSet>
            <EngIcon />
          </EngIconSet>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={2}>
        <Tooltip title="Moderate Engineering" arrow>
          <EngIconSet>
            <EngIcon />
            <EngIcon />
          </EngIconSet>
        </Tooltip>
      </ToggleButton>
      <ToggleButton value={3}>
        <Tooltip title="End-Game/Extreme Engineering" arrow>
          <EngIconSet>
            <EngIcon />
            <EngIcon />
            <EngIcon />
          </EngIconSet>
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
