import { Typography } from '@mui/material';

export const Code = ({ inline: _, ...props }: { inline?: boolean }) => {
  return <Typography color="secondary" component="span" {...props} />;
};
