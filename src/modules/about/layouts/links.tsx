import { Box, Button, Container, Paper, Typography } from '@mui/material';
import NavLink from 'next/link';
import { IAboutButton } from '../models/aboutButton';

/** Interface for Info Section Props */
interface ISectionProps {
  /** id of section */
  id: string;
  /** header to display */
  header: string;
  /** Buttons to display */
  buttons: IAboutButton[];
}

/**
 * Displays an info Section set of buttons
 * @param props id, header, and button array.
 */
export const AboutLinks = ({ id, buttons }: ISectionProps) => {
  return (
    <Container maxWidth="md">
      <Paper
        id={id}
        sx={{
          textAlign: 'center',
          width: 'fit-content',
          margin: 'auto',
          padding: 1,
          marginBottom: 1,
        }}>
        <Box sx={{ display: 'grid', gridTemplateRows: 'auto' }}>
          <Box
            sx={{
              '& button': {
                margin: 1,
              },
              '& a': {
                margin: 1,
              },
            }}>
            {buttons
              .filter((x) => x.local === true)
              .map((guide) => (
                <NavLink href={guide.link} key={guide.title} passHref>
                  <Button variant="outlined" color="secondary">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography>{guide.title}</Typography>
                      <Typography variant="caption">{guide.caption}</Typography>
                    </Box>
                  </Button>
                </NavLink>
              ))}
          </Box>
          <Box
            sx={{
              '& button': {
                margin: 1,
              },
              '& a': {
                margin: 1,
              },
            }}>
            {buttons
              .filter((x) => x.local === false)
              .map((x) => (
                <NavLink href={x.link} key={x.title} passHref>
                  <Button variant="outlined" color="primary">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography>{x.title}</Typography>
                      <Typography variant="caption">{x.caption}</Typography>
                    </Box>
                  </Button>
                </NavLink>
              ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
