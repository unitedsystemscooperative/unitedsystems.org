import { Button, ButtonProps, styled, ToggleButton } from '@mui/material';

interface StyledButtonProps extends ButtonProps {
  target?: string;
}

export const PaperOutlineButton = styled(Button)<StyledButtonProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  })
);

export const PaperOutlineToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
