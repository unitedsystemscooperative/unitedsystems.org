import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { IInfoButton } from 'models/information/infoButtonModel';

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
  specialButton: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonList: {
    '& a': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      display: 'grid',
      gridTemplateRows: 'auto',
      '& a': {
        marginRight: theme.spacing(0),
      },
    },
  },
  grid: {
    display: 'grid',
    gridTemplateRows: 'auto',
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
}));

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
export const InfoSection = (props: ISectionProps) => {
  const classes = useStyles();
  const { url } = useRouteMatch();
  const { id, header, buttons } = props;

  return (
    <Paper id={id} className={classes.paper}>
      <Typography variant="h4">{header}</Typography>
      <div className={classes.grid}>
        <div className={classes.buttonList}>
          {buttons
            .filter((x) => x.beginner === true)
            .map((guide) => {
              if (guide.local === true) {
                return (
                  <Button
                    variant="outlined"
                    color={guide.beginner ? 'secondary' : 'primary'}
                    component={Link}
                    to={`${url}${guide.link}`}
                    key={guide.title}
                  >
                    <div className={classes.specialButton}>
                      <Typography>{guide.title}</Typography>
                      <Typography variant="caption">{guide.caption}</Typography>
                    </div>
                  </Button>
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
                    <div className={classes.specialButton}>
                      <Typography>{guide.title}</Typography>
                      <Typography variant="caption">{guide.caption}</Typography>
                    </div>
                  </Button>
                );
              }
            })}
        </div>
        <div className={classes.buttonList}>
          {buttons
            .filter((x) => x.beginner === false)
            .map((guide) => {
              if (guide.local === true) {
                return (
                  <Button
                    variant="outlined"
                    color={guide.beginner ? 'secondary' : 'primary'}
                    component={Link}
                    to={`${url}${guide.link}`}
                    key={guide.title}
                  >
                    <div className={classes.specialButton}>
                      <Typography>{guide.title}</Typography>
                      <Typography variant="caption">{guide.caption}</Typography>
                    </div>
                  </Button>
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
                    <div className={classes.specialButton}>
                      <Typography>{guide.title}</Typography>
                      <Typography variant="caption">{guide.caption}</Typography>
                    </div>
                  </Button>
                );
              }
            })}
        </div>
      </div>
    </Paper>
  );
};
