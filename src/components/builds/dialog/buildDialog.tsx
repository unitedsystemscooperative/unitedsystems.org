import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { processJSONBuild } from 'functions/builds';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';
import { IBuildInfov2, IShipInfo } from 'models/builds';
import { useSnackbar } from 'notistack';
import {
  ChangeEvent,
  Fragment,
  MouseEvent,
  useEffect,
  useReducer,
} from 'react';
import { EngToggleGroup } from '../engToggleGroup';
import { QuerySpecialties } from '../query/querySpecialities';
import { ShipAutocomplete } from '../shipAutocomplete';
import { BuildAddText } from './buildAddText';
import { BuildCheckBox } from './buildCheckBox';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    display: 'grid',
    gridTemplate: 'auto / 1fr',
    rowGap: '10px',
    padding: theme.spacing(1),
    maxHeight: 600,
  },
  center: {
    textAlign: 'center',
    margin: '0 auto',
  },
}));

export interface BuildDialogProps {
  open: boolean;
  build?: IBuildInfov2;
  addType?: 'variant' | 'related';
  refId?: string;
  onClose: () => void;
}

const DEFAULTBUILD: IBuildInfov2 = {
  shipId: 'adder',
  title: '',
  specializations: [],
  buildLink: '',
  engLevel: 0,
  hasGuardian: false,
  hasPowerplay: false,
  isBeginner: false,
  author: '',
  isVariant: false,
  variants: [],
  related: [],
  description: '',
  jsonBuild: '',
};

const parseDialogTitle = (
  build: IBuildInfov2,
  addType: 'related' | 'variant'
) => {
  if (build) return <DialogTitle>Update Build</DialogTitle>;
  if (addType === 'related')
    return <DialogTitle>Add Related Build</DialogTitle>;
  if (addType === 'variant')
    return <DialogTitle>Add Variant Build</DialogTitle>;
  return <DialogTitle>Add Build</DialogTitle>;
};

type action =
  | { type: 'default' }
  | { type: 'build'; value: IBuildInfov2 }
  | { type: 'json'; value: string }
  | { type: 'title' | 'description' | 'buildLink' | 'author'; value: string }
  | { type: 'ship'; value: string }
  | { type: 'engLevel'; value: number }
  | { type: 'hasGuardian' | 'hasPowerplay' | 'isBeginner'; value: boolean }
  | { type: 'specialties'; value: string[] };
const buildReducer = (
  prevState: IBuildInfov2,
  action: action
): IBuildInfov2 => {
  let newState = prevState;
  switch (action.type) {
    case 'default':
      newState = DEFAULTBUILD;
      break;
    case 'build':
      newState = action.value;
      break;
    case 'json':
      const {
        buildName,
        shipId,
        hasGuardian,
        hasPowerplay,
        engineering,
        url,
      } = processJSONBuild(action.value);
      const engLevel = engineering ? 1 : 0;
      newState = {
        ...newState,
        title: buildName,
        hasGuardian,
        hasPowerplay,
        buildLink: url,
        shipId,
        specializations: [],
        engLevel,
        isBeginner: false,
        jsonBuild: action.value,
      };
      break;
    case 'title':
    case 'description':
    case 'buildLink':
    case 'author':
      newState = { ...newState, [action.type]: action.value };
      break;
    case 'ship':
      newState = { ...newState, shipId: action.value };
      break;
    case 'engLevel':
      newState = { ...newState, engLevel: action.value };
      break;
    case 'isBeginner':
    case 'hasGuardian':
    case 'hasPowerplay':
      newState = { ...newState, [action.type]: action.value };
      break;
    case 'specialties':
      newState = { ...newState, specializations: action.value };
      break;
  }

  return newState;
};

/**
 * Build Screen
 *
 * Used for all build creation and editing.
 */
export const BuildDialog = ({
  open,
  build,
  addType,
  refId,
  onClose,
}: BuildDialogProps) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    shipBuilds,
    addBuild,
    addRelated,
    addVariant,
    updateBuild,
  } = useShipBuilds();
  const [newBuild, dispatch] = useReducer(buildReducer, DEFAULTBUILD);

  useEffect(() => {
    if (build) dispatch({ type: 'build', value: build });
    else dispatch({ type: 'default' });
  }, [build]);

  const handleClose = (
    _?: never,
    reason?: 'escapeKeyDown' | 'backdropClick'
  ) => {
    if (reason === 'backdropClick') {
      enqueueSnackbar('Please hit the ESC key to close the dialog', {
        variant: 'info',
      });
    } else {
      onClose();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    if (
      id === 'json' ||
      id === 'title' ||
      id === 'description' ||
      id === 'buildLink' ||
      id === 'author'
    ) {
      const value = event.target.value;
      dispatch({ type: id, value });
    } else if (
      id === 'isBeginner' ||
      id === 'hasGuardian' ||
      id === 'hasPowerplay'
    ) {
      const value = event.target.checked;
      dispatch({ type: id, value });
    }
  };
  const handleShipChange = (_, value: IShipInfo | null) => {
    if (value) {
      dispatch({ type: 'ship', value: value.shipId });
    }
  };
  const handleEngLevelChange = (
    _: MouseEvent<HTMLElement>,
    engLevel: number
  ) => {
    dispatch({ type: 'engLevel', value: engLevel });
  };
  const handleSubmit = async () => {
    try {
      if (newBuild.jsonBuild === '')
        throw new Error(
          'Exported JSON is blank. Verify you have pasted the JSON from Coriolis.'
        );
      if (newBuild.specializations.length < 1)
        throw new Error(
          'No specializations have been selected. Minimum is one.'
        );
      if (newBuild.author === '') throw new Error('Author is blank.');
      if (newBuild.description === '') throw new Error('Description is blank.');
      if (newBuild.title === '') throw new Error('Build Title is blank.');
      if (newBuild.buildLink === '')
        throw new Error(
          'Build Link is blank. Verify you have pasted the JSON from Coriolis.'
        );

      try {
        if (newBuild._id) {
          await updateBuild(newBuild._id, { ...newBuild });
        } else {
          switch (addType) {
            case 'variant':
              if (refId) await addVariant(refId, shipBuilds, newBuild);
              else throw new Error('Build reference ID missing from URL');
              break;
            case 'related':
              if (refId) await addRelated(refId, shipBuilds, newBuild);
              else throw new Error('Build reference ID missing from URL');
              break;
            default:
              await addBuild(newBuild);
              break;
          }
        }
        enqueueSnackbar('Build successfully submitted', { variant: 'success' });
        onClose();
      } catch (e) {
        enqueueSnackbar(`Submit Failed: ${e.message}`, { variant: 'error' });
        console.error(e);
      }
    } catch (e) {
      enqueueSnackbar(`Submit failed. ${e.message}`, { variant: 'error' });
    }
  };

  const textFields = [
    {
      id: 'json',
      label: 'Exported JSON',
      isMultiline: true,
      value: newBuild.jsonBuild,
      onChange: handleChange,
    },
    {
      id: 'title',
      label: 'Title',
      isMultiline: false,
      value: newBuild.title,
      onChange: handleChange,
      disabled: false,
    },
    {
      id: 'description',
      label: 'More Information - Accepts markdown',
      isMultiline: true,
      value: newBuild.description,
      onChange: handleChange,
    },
    {
      id: 'buildLink',
      label: 'Build Link - Full',
      isMultiline: false,
      value: newBuild.buildLink,
      onChange: handleChange,
      disabled: true,
    },
    {
      id: 'author',
      label: 'Author',
      isMultiline: false,
      value: newBuild.author,
      onChange: handleChange,
    },
  ];

  const checkFields = [
    {
      label: 'Guardian',
      id: 'hasGuardian',
      checked: newBuild.hasGuardian,
      disabled: true,
    },
    {
      label: 'PowerPlay',
      id: 'hasPowerplay',
      checked: newBuild.hasPowerplay,
      disabled: true,
    },
    { label: 'Beginner', id: 'isBeginner', checked: newBuild.isBeginner },
  ];

  return (
    <Dialog onClose={handleClose} open={open}>
      {parseDialogTitle(build, addType)}
      <DialogContent className={classes.root}>
        <Typography>
          Save your build in Coriolis and choose Export. Paste the exported JSON
          into the Exported JSON field.
        </Typography>
        <Typography>
          Verify/enter remaining information and click Submit Build at the
          bottom.
        </Typography>
        {textFields.map((field) => (
          <Fragment key={field.id}>
            <BuildAddText {...field} />
            {field.id === 'description' && (
              <Button
                href="https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf"
                target="_blank"
                color="primary"
              >
                Markdown Cheatsheet - Opens a new tab
              </Button>
            )}
          </Fragment>
        ))}
        <ShipAutocomplete
          shipType={newBuild.shipId}
          handleShipChange={handleShipChange}
        />
        <QuerySpecialties
          selectedSpecialties={newBuild.specializations}
          setSpecialties={(value) => dispatch({ type: 'specialties', value })}
        />
        <div className={classes.center}>
          <EngToggleGroup
            engLevel={newBuild.engLevel}
            handleEngLevelChange={handleEngLevelChange}
          />
        </div>
        <FormGroup row className={classes.center}>
          {checkFields.map((check) => (
            <BuildCheckBox key={check.id} {...check} onChange={handleChange} />
          ))}
        </FormGroup>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSubmit} variant="outlined">
          Submit Build
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
