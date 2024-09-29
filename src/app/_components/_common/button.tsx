'use client';
import { Box, Button, ButtonProps, styled, ToggleButton, Typography } from '@mui/material';
import NavLink from 'next/link';

interface StyledButtonProps extends ButtonProps {
  target?: string;
}

export const PaperOutlineButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const PaperOutlineToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

type InfoButtonProps = {
  title: string;
  link: string;
  caption: string;
  local: boolean;
  color: 'primary' | 'secondary';
};
export function InfoButton({ title, link, color, caption, local }: InfoButtonProps) {
  if (local) {
    return (
      <NavLink href={link} key={title} passHref>
        <Button variant="outlined" color={color}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography>{title}</Typography>
            <Typography variant="caption">{caption}</Typography>
          </Box>
        </Button>
      </NavLink>
    );
  } else {
    return (
      <Button variant="outlined" color={color} href={link} target="_blank" key={title}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography>{title}</Typography>
          <Typography variant="caption">{caption}</Typography>
        </Box>
      </Button>
    );
  }
}
