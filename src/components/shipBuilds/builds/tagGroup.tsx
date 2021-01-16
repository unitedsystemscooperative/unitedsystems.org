import { Chip, makeStyles } from '@material-ui/core';
import { IBuildInfov2 } from 'models/shipBuilds';

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
    '& div': {
      marginRight: theme.spacing(1),
    },
  },
}));

export const TagGroup = (props: { build: IBuildInfov2 }) => {
  const { build } = props;
  const classes = useStyles();
  return (
    <div className={classes.chips}>
      {build.specializations.map((v) => (
        <Chip label={v} key={v} />
      ))}
      {build.hasGuardian && <Chip label="Guardian" key="guardian" />}
      {build.hasPowerplay && <Chip label="PowerPlay" key="powerplay" />}
      {build.isBeginner && <Chip label="Beginner" key="beginner" />}
    </div>
  );
};
