import {
  Box,
  Container,
  Link,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { useLinks } from 'hooks/useLinks';

export const Merch = () => {
  const links = useLinks();
  const theme = useTheme();
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="h3">USC Merch Store</Typography>
      <Paper sx={{ padding: theme.spacing(1) }}>
        <Typography>
          Click the image or link below to open the merch store.
        </Typography>
        <a href={links.merch} target="_blank" rel="noreferrer">
          <Box
            component="img"
            sx={{ width: '100%' }}
            src="/img/expansion.png"
            alt="expansion image"
          />
        </a>
        <Link href={links.merch} target="_blank">
          Go to the Merch Store
        </Link>
      </Paper>
    </Container>
  );
};
