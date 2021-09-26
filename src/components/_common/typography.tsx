import { styled, Typography } from '@mui/material';

/**
 * Typography automatically centered. Will ignore align prop.
 */
export const CenteredTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'align',
})(() => ({
  textAlign: 'center',
}));
