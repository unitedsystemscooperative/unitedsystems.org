import LinkIcon from '@mui/icons-material/Link';
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from '@mui/material';
import { useLinks } from 'hooks/useLinks';

export const JoinNextSteps = () => {
  const { inaraSquadLink, discordLink } = useLinks();
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Next Steps
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          <ListItem>
            <ListItemText primary={'Join our Discord'} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                href={discordLink}
                target="_blank"
                size="large"
              >
                <LinkIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <List
            component="div"
            disablePadding
            subheader={
              <ListSubheader component="div">Recommended</ListSubheader>
            }
          >
            <ListItem>
              <ListItemText primary={'Join our Inara Squadron'} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  href={inaraSquadLink}
                  target="_blank"
                  size="large"
                >
                  <LinkIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <List
              component="div"
              subheader={
                <ListSubheader component="div">Find us in game!</ListSubheader>
              }
            >
              <ListItem>UCPC for PC</ListItem>
              <ListItem>UCXB for Xbox</ListItem>
              <ListItem>UCPS for Playstation</ListItem>
            </List>
          </List>
        </List>
      </Paper>
    </Container>
  );
};
