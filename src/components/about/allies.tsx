import { EDSpinner } from '@admiralfeb/react-components';
import {
  Container,
  Fade,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useAllies } from 'hooks/about/useAllies';

/** Displays Allies */
export const AboutAllies = () => {
  const { allies, loading } = useAllies();
  return (
    <Fade in={true}>
      <Container maxWidth="xs">
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Allies
        </Typography>
        {loading ? (
          <EDSpinner />
        ) : (
          <List component={Paper} sx={{ margin: 'auto' }}>
            {allies.map((ally: { name: string }, i: number) => (
              <ListItem key={i}>
                <ListItemText primary={`${ally.name}`} />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Fade>
  );
};
