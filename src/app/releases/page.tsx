import { Container, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { getReleases } from './_getReleases';

export const metadata: Metadata = {
  title: 'USC Website Releases',
  description: 'USC Website Releases',
};

export default function ReleasePage() {
  const allReleases = getReleases();
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Releases
        </Typography>
        <List component={Paper}>
          {allReleases.map(({ id, date, title }) => (
            <NextLink key={id} href={`/releases/${id}`} passHref legacyBehavior>
              <ListItemButton component="a">
                <ListItemText>
                  {title} - {date}
                </ListItemText>
              </ListItemButton>
            </NextLink>
          ))}
        </List>
      </Container>
    </>
  );
}
