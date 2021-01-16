import { Button, makeStyles } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    gridArea: 'buttons',
    '& button': {
      margin: theme.spacing(1),
    },
  },
}));

export const QueryActions = (props: { resetQueries: () => void }) => {
  const classes = useStyles();
  const { resetQueries } = props;
  return (
    <div className={classes.root}>
      <Button
        onClick={resetQueries}
        color='primary'
        variant='outlined'
        className='resetButton'>
        Reset Selections
      </Button>
      <Link href='/builds/add' passHref>
        <Button variant='outlined' color='secondary'>
          Add Build
        </Button>
      </Link>
    </div>
  );
};
