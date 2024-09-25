import { getAllies } from '#/allies.api';
import { Container, Fade, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'United Systems Cooperative Allies',
  description: 'USC Ally List',
};

export default async function AlliesPage() {
  const allies = await getAllies();
  return (
    <>
      <Fade in={true}>
        <Container maxWidth="xs">
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Allies
          </Typography>

          <List component={Paper} sx={{ margin: 'auto' }}>
            {allies.map((ally: { name: string }, i: number) => (
              <ListItem key={i}>
                <ListItemText primary={`${ally.name}`} />
              </ListItem>
            ))}
          </List>
        </Container>
      </Fade>
    </>
  );
}
