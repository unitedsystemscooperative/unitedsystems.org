import { EDSpinner } from '@admiralfeb/react-components';
import { makeStyles, Typography } from '@material-ui/core';
import { useShipBuilds } from 'hooks/shipBuilds/useShipBuilds';
import { BuildCard } from './buildCard';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: 5,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
}));

export const BuildDetailBuilds = (props: {
  title: string;
  buildIDs: string[];
}) => {
  const { title, buildIDs } = props;
  const classes = useStyles();
  const { loading, shipBuilds } = useShipBuilds();

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <div className={classes.textCenter}>
      <Typography variant="h4">{title}</Typography>
      <div className={classes.paper}>
        {buildIDs.map((id) => {
          const build = shipBuilds.find(
            (x) => ((x._id as unknown) as string) === id
          );
          return <BuildCard shipBuild={build} key={id} />;
        })}
      </div>
    </div>
  );
};
