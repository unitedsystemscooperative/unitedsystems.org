import {
  Container,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
  },
  indent: {
    marginLeft: theme.spacing(3),
    '& p': {
      marginBottom: theme.spacing(2),
    },
  },
}));

export const OdysseyS2GCombat = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" className={classes.center}>
        Ship to Ground Combat
      </Typography>
      <Paper className={classes.paper}>
        <section>
          <Typography variant="h5">Be Wary</Typography>
          <div className={classes.indent}>
            <Typography>
              Base defenses are not to be trifled with. They can potentially
              knock out a well-shielded (Clever-engineered) ship.
            </Typography>
          </div>
        </section>
        <section>
          <Typography variant="h5">Recommended Weapons</Typography>

          <div className={classes.indent}>
            <Typography>
              The recommended weapons here allow you to fire without locking
              onto a person on the ground.
            </Typography>
            <Typography>
              The sensors of a ship will not be able to lock onto an individual
              person on the ground. The SRV is able to target each person and
              perform scans at long range.
            </Typography>
          </div>

          <Typography>
            <ul>
              <li>Dumb-fire Missiles</li>
              <li>Remote-Release Flechette Launcher</li>
              <li>
                Mines (be fast when deploying so they don't explode on you)
              </li>
            </ul>
          </Typography>
        </section>

        <section>
          <Typography variant="h5">Recommended Ships</Typography>
          <div className={classes.indent}>
            <Typography>
              The ships here have been tried and tested by our chief engineer,
              Clever Ape.
            </Typography>
          </div>
          <Typography>
            <ul>
              <li>Mamba</li>
              <li>Imperial Courier</li>
            </ul>
          </Typography>
        </section>

        <section>
          <Typography variant="h5">Builds</Typography>
          <div className={classes.indent}>
            <Typography>
              <ul>
                <li>
                  <NextLink
                    href="/builds?beginner&engLevel&guardian&powerplay&ship&showVariants=false&size&specialties=Combat%20-%20Ship%20to%20Ground"
                    passHref
                  >
                    <Link>Ship to Ground Combat Builds</Link>
                  </NextLink>
                </li>
                <li>
                  <NextLink
                    href="/builds?beginner&engLevel&guardian&powerplay&ship&showVariants=false&size&specialties=Odyssey%20Lander%20%2F%20Support"
                    passHref
                  >
                    <Link>Odyssey Lander/Support Builds</Link>
                  </NextLink>
                </li>
              </ul>
            </Typography>
          </div>
        </section>
      </Paper>
    </Container>
  );
};
