import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    gridArea: 'buttons',
    '& button': {
      margin: theme.spacing(1),
    },
  },
}));

export interface QueryActionsProps {
  resetQueries: () => void;
  addBuild: () => void;
}

export const QueryActions = ({ resetQueries, addBuild }: QueryActionsProps) => {
  const classes = useStyles();

  const handleAdd = () => {
    console.log('QueryActions: Add build clicked');
    addBuild();
  };
  return (
    <div className={classes.root}>
      <Button
        onClick={resetQueries}
        color="primary"
        variant="outlined"
        className="resetButton"
      >
        Reset Selections
      </Button>
      <Button onClick={handleAdd} variant="outlined" color="secondary">
        Add Build
      </Button>
    </div>
  );
};
