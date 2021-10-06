import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  TextField,
  Typography,
} from '@mui/material';
import { processJSONBuild } from 'functions/builds';
import { IBuildInfov2, IShipInfo } from 'models/builds';
import { useSnackbar } from 'notistack';
import { ChangeEvent, Fragment, MouseEvent, useEffect, useReducer } from 'react';
import { EngToggleGroup } from '../engToggleGroup';
import { QuerySpecialties } from '../query/querySpecialities';
import { ShipAutocomplete } from '../shipAutocomplete';
import { BuildAddText } from './buildAddText';
import { BuildCheckBox } from './buildCheckBox';

export interface BuildDialogProps {
  open: boolean;
  build?: IBuildInfov2;
  builds: IBuildInfov2[];
  addType?: 'variant' | 'related';
  refId?: string;
  onClose: (build?: IBuildInfov2) => void;
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
  variantOf: '',
  variants: [],
  related: [],
  description: '',
  jsonBuild: '',
};

const parseDialogTitle = (build: IBuildInfov2, addType: 'related' | 'variant') => {
  if (build) return <DialogTitle>Update Build</DialogTitle>;
  if (addType === 'related') return <DialogTitle>Add Related Build</DialogTitle>;
  if (addType === 'variant') return <DialogTitle>Add Variant Build</DialogTitle>;
  return <DialogTitle>Add Build</DialogTitle>;
};

function findBuildTitle(builds: IBuildInfov2[], ids: string | IBuildInfov2): IBuildInfov2;
function findBuildTitle(builds: IBuildInfov2[], ids: (string | IBuildInfov2)[]): IBuildInfov2[];
function findBuildTitle(builds: IBuildInfov2[], ids: string | IBuildInfov2 | (string | IBuildInfov2)[]) {
  if (Array.isArray(ids)) {
    if (ids.length < 1) return [];
    const results = ids.map((x) => builds.find((y) => y._id.toString() === x));
    return results;
  }
  if (ids) {
    const result = builds.find((x) => x._id.toString() === ids);
    return result;
  }
}

type action =
  | { type: 'default' }
  | { type: 'build'; value: IBuildInfov2 }
  | { type: 'json'; value: string }
  | { type: 'title' | 'description' | 'buildLink' | 'author'; value: string }
  | { type: 'ship'; value: string }
  | { type: 'engLevel'; value: number }
  | { type: 'hasGuardian' | 'hasPowerplay' | 'isBeginner'; value: boolean }
  | { type: 'specialties'; value: string[] }
  | { type: 'variantOf'; value: string | IBuildInfov2 }
  | { type: 'relateds'; value: (string | IBuildInfov2)[] }
  | { type: 'variants'; value: (string | IBuildInfov2)[] };
const buildReducer = (prevState: IBuildInfov2, action: action): IBuildInfov2 => {
  let newState = prevState;
  switch (action.type) {
    case 'default':
      newState = DEFAULTBUILD;
      break;
    case 'build':
      newState = action.value;
      break;
    case 'json':
      const { buildName, shipId, hasGuardian, hasPowerplay, engineering, url } = processJSONBuild(action.value);
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
    case 'variantOf':
      console.log(action.value);
      break;
    case 'relateds':
      console.log(action.value);
      newState = {
        ...newState,
        related: action.value.map((x) => {
          if (typeof x === 'string') return x;
          else return x._id.toString();
        }),
      };
      break;
    case 'variants':
      console.log(action.value);
      newState = {
        ...newState,
        variants: action.value.map((x) => {
          if (typeof x === 'string') return x;
          else return x._id.toString();
        }),
      };
      break;
  }

  return newState;
};

/**
 * Build Screen
 *
 * Used for all build creation and editing.
 */
export const BuildDialog = ({ open, build, builds, addType, onClose }: BuildDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [newBuild, dispatch] = useReducer(buildReducer, DEFAULTBUILD);

  useEffect(() => {
    if (build) dispatch({ type: 'build', value: build });
    else dispatch({ type: 'default' });
  }, [build]);

  const handleClose = (_?: never, reason?: 'escapeKeyDown' | 'backdropClick') => {
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
    if (id === 'json' || id === 'title' || id === 'description' || id === 'buildLink' || id === 'author') {
      const value = event.target.value;
      dispatch({ type: id, value });
    } else if (id === 'isBeginner' || id === 'hasGuardian' || id === 'hasPowerplay') {
      const value = event.target.checked;
      dispatch({ type: id, value });
    }
  };
  const handleShipChange = (_, value: IShipInfo | null) => {
    if (value) {
      dispatch({ type: 'ship', value: value.shipId });
    }
  };
  const handleEngLevelChange = (_: MouseEvent<HTMLElement>, engLevel: number) => {
    dispatch({ type: 'engLevel', value: engLevel });
  };
  const handleSubmit = async () => {
    try {
      if (newBuild.jsonBuild === '')
        throw new Error('Exported JSON is blank. Verify you have pasted the JSON from Coriolis.');
      if (newBuild.specializations.length < 1)
        throw new Error('No specializations have been selected. Minimum is one.');
      if (newBuild.author === '') throw new Error('Author is blank.');
      if (newBuild.description === '') throw new Error('Description is blank.');
      if (newBuild.title === '') throw new Error('Build Title is blank.');
      if (newBuild.buildLink === '')
        throw new Error('Build Link is blank. Verify you have pasted the JSON from Coriolis.');

      onClose(newBuild);
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
      <DialogContent
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          maxHeight: 600,
        }}>
        <Typography>
          Save your build in Coriolis and choose Export. Paste the exported JSON into the Exported JSON field.
        </Typography>
        <Typography>Verify/enter remaining information and click Submit Build at the bottom.</Typography>
        {textFields.map((field) => (
          <Fragment key={field.id}>
            <BuildAddText {...field} />
            {field.id === 'description' && (
              <Button
                href="https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf"
                target="_blank"
                color="primary">
                Markdown Cheatsheet - Opens a new tab
              </Button>
            )}
          </Fragment>
        ))}
        <ShipAutocomplete shipType={newBuild.shipId} handleShipChange={handleShipChange} disableClearable />
        <QuerySpecialties
          selectedSpecialties={newBuild.specializations}
          setSpecialties={(value) => dispatch({ type: 'specialties', value })}
        />
        <div style={{ textAlign: 'center', margin: '0 auto' }}>
          <EngToggleGroup engLevel={newBuild.engLevel} handleEngLevelChange={handleEngLevelChange} />
        </div>
        <FormGroup row style={{ textAlign: 'center', margin: '0 auto' }}>
          {checkFields.map((check) => (
            <BuildCheckBox key={check.id} {...check} onChange={handleChange} />
          ))}
        </FormGroup>
        <Autocomplete
          id="variantOfBuild"
          options={builds}
          getOptionLabel={(b) => b.title}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} variant="standard" label="Variant of Build" />}
          value={findBuildTitle(builds, newBuild.variantOf)}
          onChange={(_, value) => dispatch({ type: 'variantOf', value: value })}
        />
        <Autocomplete
          multiple
          id="relatedBuilds"
          options={builds}
          getOptionLabel={(b) => b.title}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} variant="standard" label="Related Builds" />}
          value={findBuildTitle(builds, newBuild.related)}
          onChange={(_, value) => dispatch({ type: 'relateds', value: value })}
        />
        <Autocomplete
          multiple
          id="variantBuilds"
          options={builds}
          getOptionLabel={(b) => b.title}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} variant="standard" label="Variant Builds" />}
          value={findBuildTitle(builds, newBuild.variants)}
          onChange={(_, value) => dispatch({ type: 'variants', value: value })}
        />
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
