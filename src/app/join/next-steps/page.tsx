import { DiscordLink, InaraSquadLink } from '@/data/links';
import LinkIcon from '@mui/icons-material/Link';
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Steps after Joining USC',
};

export const JoinNextStepsPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Next Steps
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          <ListItem
            secondaryAction={
              <IconButton edge="end" href={DiscordLink} target="_blank" size="large">
                <LinkIcon />
              </IconButton>
            }>
            <ListItemText primary={'Join our Discord'} />
          </ListItem>
          <List
            component="div"
            disablePadding
            subheader={<ListSubheader component="div">Recommended</ListSubheader>}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" href={InaraSquadLink} target="_blank" size="large">
                  <LinkIcon />
                </IconButton>
              }>
              <ListItemText primary={'Join our Inara Squadron'} />
            </ListItem>
            <List
              component="div"
              subheader={<ListSubheader component="div">Find us in game!</ListSubheader>}>
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

export default JoinNextStepsPage;
