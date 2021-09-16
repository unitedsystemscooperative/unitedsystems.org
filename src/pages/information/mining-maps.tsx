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
import makeStyles from '@mui/styles/makeStyles';
import { useMiningMaps } from 'hooks/information/useMiningMaps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { copytoClipboard } from 'functions/copytoClipboard';
import { useLinks } from 'hooks/useLinks';
import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}));

const MiningMap = () => {
  const maps = useMiningMaps();
  const classes = useStyles();
  const { inaraCommodity } = useLinks();

  return (
    <>
      <Head>
        <title>USC Mining Maps</title>
        <meta name="description" content="Compiled Mining Maps" />
      </Head>
      <PrimaryLayout>
        <Container maxWidth="md" className={classes.root}>
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
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => copytoClipboard(map.system)}
                      >
                        <FileCopyIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{map.body}</TableCell>
                    <TableCell>
                      <Link
                        href={`${inaraCommodity}${map.materialInara}`}
                        target="_blank"
                      >
                        {map.material}
                      </Link>
                    </TableCell>
                    <TableCell>{map.miningType}</TableCell>
                    <TableCell>{map.overlap}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        href={map.link}
                        target="_blank"
                      >
                        Open Map
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </PrimaryLayout>
    </>
  );
};

export default MiningMap;
