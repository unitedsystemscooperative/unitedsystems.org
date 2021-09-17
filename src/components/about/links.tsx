import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { IInfoButton } from 'models/information/infoButtonModel';
import NavLink from 'next/link';

/** Interface for Info Section Props */
interface ISectionProps {
  /** id of section */
  id: string;
  /** header to display */
  header: string;
  /** Buttons to display */
  buttons: IInfoButton[];
}

/**
 * Displays an info Section set of buttons
 * @param props id, header, and button array.
 */
export const AboutLinks = (props: ISectionProps) => {
  const { id, buttons } = props;

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
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateRows: 'auto' }}>
          <Box
            sx={{
              '& button': {
                margin: 1,
              },
              '& a': {
                margin: 1,
              },
            }}
          >
            {buttons
              .filter((x) => x.beginner === true)
              .map((guide) => {
                if (guide.local === true) {
                  return (
                    <NavLink href={guide.link} key={guide.title} passHref>
                      <Button
                        variant="outlined"
                        color={guide.beginner ? 'secondary' : 'primary'}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography>{guide.title}</Typography>
                          <Typography variant="caption">
                            {guide.caption}
                          </Typography>
                        </Box>
                      </Button>
                    </NavLink>
                  );
                } else {
                  return (
                    <Button
                      variant="outlined"
                      color={guide.beginner ? 'secondary' : 'primary'}
                      href={guide.link}
                      target="_blank"
                      key={guide.title}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>{guide.title}</Typography>
                        <Typography variant="caption">
                          {guide.caption}
                        </Typography>
                      </Box>
                    </Button>
                  );
                }
              })}
          </Box>
          <Box
            sx={{
              '& button': {
                margin: 1,
              },
              '& a': {
                margin: 1,
              },
            }}
          >
            {buttons
              .filter((x) => x.beginner === false)
              .map((guide) => {
                if (guide.local === true) {
                  return (
                    <NavLink key={guide.title} href={guide.link} passHref>
                      <Button
                        variant="outlined"
                        color={guide.beginner ? 'secondary' : 'primary'}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography>{guide.title}</Typography>
                          <Typography variant="caption">
                            {guide.caption}
                          </Typography>
                        </Box>
                      </Button>
                    </NavLink>
                  );
                } else {
                  return (
                    <Button
                      variant="outlined"
                      color={guide.beginner ? 'secondary' : 'primary'}
                      href={guide.link}
                      target="_blank"
                      key={guide.title}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>{guide.title}</Typography>
                        <Typography variant="caption">
                          {guide.caption}
                        </Typography>
                      </Box>
                    </Button>
                  );
                }
              })}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
