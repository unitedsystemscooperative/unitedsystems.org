import {
  Box,
  Container,
  Fade,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Paper,
  SxProps,
  Tooltip,
  Typography,
} from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';
import { discordRules, memberRules } from './data';

export const metadata: Metadata = {
  title: 'United Systems Cooperative Rules',
  description: 'USC Rules List',
};

export default function RulesPage() {
  const sxRules: SxProps = {
    border: '3px solid white',
    borderRadius: '10px',
    height: '100%',
  };

  const sxListItem: SxProps = {
    marginLeft: 1,
    marginRight: 2,
    marginTop: 0,
    marginBottom: 0,
  };

  return (
    <Fade in={true}>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Rules
        </Typography>
        <Box component={Paper} sx={{ flexGrow: 1 }}>
          <Grid2 container spacing={1}>
            <Grid2 size={4}>
              <Box sx={sxRules}>
                <Typography variant="h5">Discord</Typography>
                <List>
                  {discordRules.map((rule: string, index: number) => (
                    <ListItem key={index} sx={sxListItem}>
                      <ListItemText primary={`${index + 1}) ${rule}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid2>
            <Grid2 size={8}>
              <Box sx={sxRules}>
                <Typography variant="h5">Members of USC</Typography>
                <List>
                  <ListItem sx={sxListItem}>
                    <ListItemText>
                      1) Will not{' '}
                      <Tooltip title="Intentionally and Improperly closing the game/session to avoid dying in combat">
                        <Link
                          href="https://elite-dangerous.fandom.com/wiki/Combat_Logging"
                          target="_blank">
                          Combat Log
                        </Link>
                      </Tooltip>
                    </ListItemText>
                  </ListItem>
                  {memberRules.map((rule: string, index: number) => (
                    <ListItem key={index} sx={sxListItem}>
                      <ListItemText primary={`${index + 2}) ${rule}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid2>
            <Grid2 size={12}>
              <Typography
                sx={{
                  border: '3px solid white',
                  borderRadius: '10px',
                  padding: 1,
                }}>
                Those found in violation of any of these Discord or Group rules, or found attempting
                to bypass these rules in any way, will first be subject to a minimum of a warning,
                further offences will be subject to demotion, expulsion, and/or USC Kill-on-Sight
                status.
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </Fade>
  );
}
