import { styled, Typography } from '@mui/material';

/* istanbul ignore next */
/**
 * Typography automatically centered. Will ignore align prop.
 */
export const CenteredTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'align',
})(() => ({
  textAlign: 'center',
}));
