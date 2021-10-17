import { EDSpinner } from '@admiralfeb/react-components';
import { Container, Fade, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useAllies } from 'hooks/about/useAllies';
import { IAlly } from 'models/about/ally';

/** Displays Allies */
export const AboutAllies = ({ init }: { init: IAlly[] }) => {
  const { allies, loading } = useAllies(init);
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
