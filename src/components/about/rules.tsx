import {
  Box,
  Container,
  Fade,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { discordRules, memberRules } from 'data/about';

/** Displays the rules */
export const USCRules = () => {
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
          <Grid container spacing={1}>
            <Grid item xs={4}>
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
            </Grid>
            <Grid item xs={8}>
              <Box sx={sxRules}>
                <Typography variant="h5">Members of USC</Typography>
                <List>
                  <ListItem sx={sxListItem}>
                    <ListItemText>
                      1) Will not{' '}
                      <Tooltip title="Intentionally and Improperly closing the game/session to avoid dying in combat">
                        <Link
                          href="https://elite-dangerous.fandom.com/wiki/Combat_Logging"
                          target="_blank"
                        >
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
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{
                  border: '3px solid white',
                  borderRadius: '10px',
                  padding: 1,
                }}
              >
                Those found in violation of any of these Discord or Group rules,
                or found attempting to bypass these rules in any way, will first
                be subject to a minimum of a warning, further offences will be
                subject to demotion, expulsion, and/or USC Kill-on-Sight status.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fade>
  );
};
