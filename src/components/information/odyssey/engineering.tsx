import {
  Container,
  Link,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';

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

export const OdysseyEngineering = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" className={classes.center}>
        Engineering in Odyssey
      </Typography>
      <Paper className={classes.paper}>
        <Typography>What's different from Horizons in Engineering?</Typography>

        <section>
          <Typography variant="h5">Engineers</Typography>
          <div className={classes.indent}>
            <Typography>
              There are 9 new engineers. They can be found{' '}
              <Link
                href="https://inara.cz/engineers/#tab_engineerstype1"
                target="blank"
              >
                here
              </Link>
              .
            </Typography>
            <Typography>
              The new engineers function differently than in Horizons. While
              they still have an invite requirement, they do not have an unlock
              requirement. To introduce you to one of their contemporaries, they
              will require a payment, such as Domino Green needing{' '}
              <em>5 Measures of Push</em> to introduce you to Kit Fowler.
            </Typography>
            <Typography>
              There are no rank/grade upgrades and nothing can be pinned for
              engineering the suits/weapons.
            </Typography>
            <Typography>
              These new engineers have Apex landing ability, but none of the
              ship engineers do as a ship is required for engineering with the
              others.
            </Typography>
          </div>
        </section>

        <section>
          <Typography variant="h5">Process</Typography>
          <div className={classes.indent}>
            <Typography>
              The process for engineering your suit or weapon is different here.
            </Typography>
            <Typography>To upgrade a suit or weapon, you must:</Typography>
            <Typography>
              <ol>
                <li>
                  Visit Pioneer Supplies and choose the{' '}
                  <strong>Upgrade/Sell</strong> button for either suits or
                  weapons.
                </li>
                <li>
                  You must spend the materials that you gather to pay for the
                  upgrade to the next grade, which provides better protection
                  and an engineering slot. For grade info, see{' '}
                  <Link
                    href="https://inara.cz/blueprints/#tab_blueprintsequipment"
                    target="blank"
                  >
                    Inara
                  </Link>
                  .
                </li>
                <li>
                  With an empty engineering slot, you can take your equipment to
                  an engineer that specializes in the upgrade you desire and
                  have them add it to the suit or weapon. See{' '}
                  <Link
                    href="https://inara.cz/blueprints/#tab_blueprintsequipment"
                    target="blank"
                  >
                    Inara
                  </Link>{' '}
                  for possible upgrades.
                </li>
              </ol>
            </Typography>
          </div>
        </section>

        <section>
          <Typography variant="h5">
            Pre-Upgraded/Engineered Equipment
          </Typography>
          <div className={classes.indent}>
            <Typography>
              It is entirely possible to find Grade 2 or 3 suits or weapons with
              an empty or filled engineering slot. The availablility is random
              and will disappear once bought by a player.
            </Typography>
          </div>
        </section>

        <section>
          <Typography variant="h5">Farming Materials</Typography>
          <div className={classes.indent}>
            <Typography>
              As expected of Odyssey, you must be on ground to farm materials.
              You will need a Detailed Surface Scanner to find farming locations
              on planet surfaces.
            </Typography>
            <Typography>
              The following are locations where you can retrieve materials:
              <ul>
                <li>Irregular Markers</li>
                <li>Impact Site</li>
                <li>Crashed Ship</li>
              </ul>
            </Typography>
          </div>
        </section>
      </Paper>
    </Container>
  );
};
