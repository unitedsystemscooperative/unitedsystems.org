import { styled } from '@mui/material';
import Image from 'next/image';
const engineerIcon = '/img/shipBuilds/Engineer_icon.svg';

const EngDiv = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const EngIcons = (props: { engLevel: number; ditchText?: boolean }) => {
  let icons: JSX.Element[] = [];
  if (props.engLevel > 3 || props.engLevel < 1) {
    return <EngDiv>{props.ditchText ? 'None' : 'Engineering Level: None'}</EngDiv>;
  } else {
    for (let i = 1; i <= props.engLevel; i++) {
      icons = [
        ...icons,
        <Image src={engineerIcon} key={i} alt="Engineering Icon" height={20} width={20} />,
      ];
    }
    if (props.ditchText) return <EngDiv>{icons.map((icon) => icon)}</EngDiv>;
    return (
      <EngDiv>
        <span>Engineering Level:</span> {icons.map((icon) => icon)}
      </EngDiv>
    );
  }
};
