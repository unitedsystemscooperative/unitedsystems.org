import { makeStyles, Typography } from '@material-ui/core';
import { SetStateAction, MouseEvent, Dispatch } from 'react';
import { EngToggleGroup } from '../engToggleGroup';
import { useSharedStyles } from './sharedStyles';

const useStyles = makeStyles({
  engineeringQuery: {
    gridArea: 'engineering',
  },
});

export const QueryEngineering = (props: {
  engLevel: number | null;
  setEngLevel: Dispatch<SetStateAction<number | null>>;
}) => {
  const { engLevel, setEngLevel } = props;
  const sharedClasses = useSharedStyles();
  const classes = useStyles();

  const handleEngLevelChange = (
    _: MouseEvent<HTMLElement>,
    newValue: number
  ) => {
    setEngLevel(newValue);
  };

  return (
    <div
      className={`${sharedClasses.querySection} ${classes.engineeringQuery}`}
    >
      <h3 className={sharedClasses.querySectionheader}>
        Ship Engineering Level
      </h3>
      <Typography className={sharedClasses.queryExplanationText}>
        Select Engineering level ranging from None to Max Engineering.
      </Typography>
      <EngToggleGroup
        engLevel={engLevel}
        handleEngLevelChange={handleEngLevelChange}
      />
    </div>
  );
};
