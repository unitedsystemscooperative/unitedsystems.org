import { copytoClipboard } from '@/functions/copytoClipboard';
import { useLinks } from '@/hooks/useLinks';
import { FileCopy } from '@mui/icons-material';
import {
  Button,
  Container,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useMiningMaps } from '~/information/hooks/useMiningMaps';

export const MiningMaps = () => {
  const maps = useMiningMaps();
  const { inaraCommodity } = useLinks();
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await copytoClipboard(text);
      enqueueSnackbar('Copied', { variant: 'success' });
    } catch {
      enqueueSnackbar('Failed to copy', { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Typography variant="h3">Mining Maps</Typography>
      <Typography variant="subtitle1">Compiled by Luisqa</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>System</TableCell>
              <TableCell>Body</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Mining Type</TableCell>
              <TableCell>Rez Overlap</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maps.map((map) => (
              <TableRow key={map.link}>
                <TableCell>
                  {map.system}{' '}
                  <IconButton size="small" color="secondary" onClick={() => copy(map.system)}>
                    <FileCopy />
                  </IconButton>
                </TableCell>
                <TableCell>{map.body}</TableCell>
                <TableCell>
                  <Link href={`${inaraCommodity}${map.materialInara}`} target="_blank">
                    {map.material}
                  </Link>
                </TableCell>
                <TableCell>{map.miningType}</TableCell>
                <TableCell>{map.overlap}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" href={map.link} target="_blank">
                    Open Map
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
