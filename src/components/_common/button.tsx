import { Button, ButtonProps, styled } from '@mui/material';

interface StyledButtonProps extends ButtonProps {
  target?: string;
}

export const PaperOutlineButton = styled(Button)<StyledButtonProps>(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  })
);
