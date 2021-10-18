import { Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { hc } from 'data/about';

/** Displays High Command Members */
export const AboutHC = () => {
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        High Command
      </Typography>
      <List component={Paper} sx={{ margin: 'auto' }}>
        {hc.map((rule: string, i: number) => (
          <ListItem key={i}>
            <ListItemText primary={`${rule}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
