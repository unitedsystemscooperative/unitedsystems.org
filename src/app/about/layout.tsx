import { CenteredTypography } from '@/components/_common/typography';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import NavLink from 'next/link';
import { ReactNode } from 'react';
import { uscLinksList } from './uscLinksList';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container maxWidth="md">
        <CenteredTypography variant="h3">About USC</CenteredTypography>
        <Container maxWidth="md">
          <Paper
            id="usc-links"
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
                {uscLinksList
                  .filter((x) => x.beginner === true)
                  .map((guide) => {
                    if (guide.local === true) {
                      return (
                        <NavLink href={guide.link} key={guide.title} passHref>
                          <Button
                            variant="outlined"
                            color={guide.beginner ? 'secondary' : 'primary'}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography>{guide.title}</Typography>
                              <Typography variant="caption">{guide.caption}</Typography>
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
                          key={guide.title}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography>{guide.title}</Typography>
                            <Typography variant="caption">{guide.caption}</Typography>
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
                }}>
                {uscLinksList
                  .filter((x) => x.beginner === false)
                  .map((guide) => {
                    if (guide.local === true) {
                      return (
                        <NavLink key={guide.title} href={guide.link} passHref>
                          <Button
                            variant="outlined"
                            color={guide.beginner ? 'secondary' : 'primary'}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography>{guide.title}</Typography>
                              <Typography variant="caption">{guide.caption}</Typography>
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
                          key={guide.title}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography>{guide.title}</Typography>
                            <Typography variant="caption">{guide.caption}</Typography>
                          </Box>
                        </Button>
                      );
                    }
                  })}
              </Box>
            </Box>
          </Paper>
        </Container>
      </Container>
      {children}
    </>
  );
}
