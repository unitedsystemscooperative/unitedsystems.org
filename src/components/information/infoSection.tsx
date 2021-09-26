import { Button, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { IInfoButton } from 'models/information/infoButtonModel';
import NextLink from 'next/link';

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
    [theme.breakpoints.down('lg')]: {
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
  const { id, header, buttons } = props;

  return (
    <Paper id={id} className={classes.paper}>
      <Typography variant="h4">{header}</Typography>
      <div className={classes.grid}>
        <div className={classes.buttonList}>
          {buttons
            .filter((x) => x.beginner === true)
            .map((guide) => {
              return guide.local ? (
                <NextLink
                  href={`/information/${guide.link}`}
                  key={guide.title}
                  passHref
                >
                  <Button
                    variant="outlined"
                    color={guide.beginner ? 'secondary' : 'primary'}
                  >
                    <div className={classes.specialButton}>
                      <Typography>{guide.title}</Typography>
                      <Typography variant="caption">{guide.caption}</Typography>
                    </div>
                  </Button>
                </NextLink>
              ) : (
                <Button
                  variant="outlined"
                  color={guide.beginner ? 'secondary' : 'primary'}
                  href={`${guide.link}`}
                  key={guide.title}
                >
                  <div className={classes.specialButton}>
                    <Typography>{guide.title}</Typography>
                    <Typography variant="caption">{guide.caption}</Typography>
                  </div>
                </Button>
              );
            })}
        </div>
        <div className={classes.buttonList}>
          {buttons
            .filter((x) => x.beginner === false)
            .map((guide) => {
              return guide.local ? (
                <NextLink
                  href={`/information/${guide.link}`}
                  key={guide.title}
                  passHref
                >
                  <Button
                    variant="outlined"
                    color={guide.beginner ? 'secondary' : 'primary'}
                  >
                    <div className={classes.specialButton}>
                      <Typography>{guide.title}</Typography>
                      <Typography variant="caption">{guide.caption}</Typography>
                    </div>
                  </Button>
                </NextLink>
              ) : (
                <Button
                  variant="outlined"
                  color={guide.beginner ? 'secondary' : 'primary'}
                  href={`${guide.link}`}
                  key={guide.title}
                >
                  <div className={classes.specialButton}>
                    <Typography>{guide.title}</Typography>
                    <Typography variant="caption">{guide.caption}</Typography>
                  </div>
                </Button>
              );
            })}
        </div>
      </div>
    </Paper>
  );
};
