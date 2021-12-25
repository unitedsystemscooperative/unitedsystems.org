import { CenteredTypography, IndentedDiv, PaperP2 } from '@/components/_common';
import { Container, Link, Typography } from '@mui/material';
import NextLink from 'next/link';

export const OdysseyS2GCombat = () => {
  return (
    <Container maxWidth="lg">
      <CenteredTypography variant="h4">Ship to Ground Combat</CenteredTypography>
      <PaperP2>
        <section>
          <Typography variant="h5">Be Wary</Typography>
          <IndentedDiv>
            <Typography>
              Base defenses are not to be trifled with. They can potentially knock out a
              well-shielded (Clever-engineered) ship.
            </Typography>
          </IndentedDiv>
        </section>
        <section>
          <Typography variant="h5">Recommended Weapons</Typography>

          <IndentedDiv>
            <Typography>
              The recommended weapons here allow you to fire without locking onto a person on the
              ground.
            </Typography>
            <Typography>
              The sensors of a ship will not be able to lock onto an individual person on the
              ground. The SRV is able to target each person and perform scans at long range.
            </Typography>
          </IndentedDiv>

          <Typography>
            <ul>
              <li>Dumb-fire Missiles</li>
              <li>Remote-Release Flechette Launcher</li>
              <li>Mines (be fast when deploying so they don't explode on you)</li>
            </ul>
          </Typography>
        </section>

        <section>
          <Typography variant="h5">Recommended Ships</Typography>
          <IndentedDiv>
            <Typography>
              The ships here have been tried and tested by our chief engineer, Clever Ape.
            </Typography>
          </IndentedDiv>
          <Typography>
            <ul>
              <li>Mamba</li>
              <li>Imperial Courier</li>
            </ul>
          </Typography>
        </section>

        <section>
          <Typography variant="h5">Builds</Typography>
          <Typography>
            <ul>
              <li>
                <NextLink
                  href={{
                    pathname: '/builds',
                    query: { specialties: 'Combat - Ship to Ground' },
                  }}
                  passHref>
                  <Link>Ship to Ground Combat Builds</Link>
                </NextLink>
              </li>
              <li>
                <NextLink
                  href={{
                    pathname: '/builds',
                    query: { specialties: 'Odyssey Lander / Support' },
                  }}
                  passHref>
                  <Link>Odyssey Lander/Support Builds</Link>
                </NextLink>
              </li>
            </ul>
          </Typography>
        </section>
      </PaperP2>
    </Container>
  );
};
