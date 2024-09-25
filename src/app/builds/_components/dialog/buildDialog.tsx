import { getShipInfofromID, groupandSortBuilds, processJSONBuild } from '@/app/builds/_functions';
import { IBuildInfov2, IShipInfo } from '@/app/builds/_models';
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
import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from 'notistack';
import { ChangeEvent, Fragment, MouseEvent, useEffect, useMemo, useReducer } from 'react';
import { EngToggleGroup } from '../engToggleGroup';
import { QuerySpecialties } from '../query/querySpecialities';
import { ShipAutocomplete } from '../shipAutocomplete';
import { BuildAddText } from './buildAddText';
import { BuildCheckBox } from './buildCheckBox';
import { BuildOption } from './buildOption';
import { WithOptionalId } from '@/utils/db';

export interface BuildDialogProps {
  open: boolean;
  build?: IBuildInfov2;
  builds: IBuildInfov2[];
  refId?: string;
  onClose: (build?: IBuildInfov2) => void;
}

const DEFAULTBUILD: WithOptionalId<IBuildInfov2> = {
  shipId: 'adder',
  title: '',
  specializations: [],
  buildLink: '',
  engLevel: 0,
  hasGuardian: false,
  hasPowerplay: false,
  isBeginner: false,
  author: '',
  related: [],
  description: '',
  jsonBuild: '',
};

type action =
  | { type: 'default'; value?: string }
  | { type: 'build'; value: IBuildInfov2 }
  | {
      type: 'json';
      value: string;
      enqueueSnackbar: (message: SnackbarMessage, options: OptionsObject) => SnackbarKey;
    }
  | { type: 'title' | 'description' | 'buildLink' | 'author'; value: string }
  | { type: 'ship'; value: string }
  | { type: 'engLevel'; value: number }
  | { type: 'hasGuardian' | 'hasPowerplay' | 'isBeginner'; value: boolean }
  | { type: 'specialties'; value: string[] }
  | { type: 'relateds'; value: (string | IBuildInfov2)[] };
const buildReducer = (prevState: IBuildInfov2, action: action): IBuildInfov2 => {
  let newState = prevState;
  switch (action.type) {
    case 'default':
      if (action.value) newState = { ...DEFAULTBUILD, related: [action.value] };
      else newState = DEFAULTBUILD;
      break;
    case 'build':
      newState = action.value;
      break;
    case 'json':
      try {
        const { buildName, shipId, hasGuardian, hasPowerplay, engineering, url } = processJSONBuild(
          action.value
        );
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
        action.enqueueSnackbar(
          'JSON parsed. Title, Build Link, Ship Type, Engineering, Guardian, and PowerPlay have been updated.',
          { variant: 'success' }
        );
      } catch (e) {
        action.enqueueSnackbar(
          'Issue parsing JSON. Was it copy/pasted correctly?\nNo changes have been made to the build.',
          { variant: 'warning' }
        );
      }
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
    case 'relateds':
      newState = {
        ...newState,
        related: action.value.map((x) => {
          if (typeof x === 'string') return x;
          else return x._id.toString();
        }),
      };
      break;
  }

  return newState;
};
interface BuildwShipType extends IBuildInfov2 {
  shipType: string;
}

/**
 * Build Screen
 *
 * Used for all build creation and editing.
 */
export const BuildDialog = ({ open, build, builds, refId, onClose }: BuildDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [newBuild, dispatch] = useReducer(buildReducer, DEFAULTBUILD);

  const buildswShipType: BuildwShipType[] = useMemo(() => {
    return groupandSortBuilds(builds).map((b) => {
      const shipType = getShipInfofromID(b.shipId).name;
      const buildwShipType: BuildwShipType = { ...b, shipType };
      return buildwShipType;
    });
  }, [builds]);

  useEffect(() => {
    if (build) dispatch({ type: 'build', value: build });
    else dispatch({ type: 'default', value: refId });
  }, [build, refId]);

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
    if (id === 'title' || id === 'description' || id === 'buildLink' || id === 'author') {
      const value = event.target.value;
      dispatch({ type: id, value });
    } else if (id === 'json') {
      const value = event.target.value;
      dispatch({ type: id, value, enqueueSnackbar });
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
      if (builds.find((x) => x.title.trim().toUpperCase() === newBuild.title.trim().toUpperCase()))
        throw new Error('Duplicate build title. Build title must be unique.');
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
      {build ? <DialogTitle>Update Build</DialogTitle> : <DialogTitle>Add Build</DialogTitle>}
      <DialogContent
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          maxHeight: 600,
        }}>
        <Typography>
          Save your build in Coriolis and choose Export. Paste the exported JSON into the Exported
          JSON field.
        </Typography>
        <Typography>
          Verify/enter remaining information and click Submit Build at the bottom.
        </Typography>
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
        <ShipAutocomplete
          shipType={newBuild.shipId}
          handleShipChange={handleShipChange}
          disableClearable
        />
        <QuerySpecialties
          selectedSpecialties={newBuild.specializations}
          setSpecialties={(value) => dispatch({ type: 'specialties', value })}
        />
        <div style={{ textAlign: 'center', margin: '0 auto' }}>
          <EngToggleGroup
            engLevel={newBuild.engLevel}
            handleEngLevelChange={handleEngLevelChange}
          />
        </div>
        <FormGroup row style={{ textAlign: 'center', margin: '0 auto' }}>
          {checkFields.map((check) => (
            <BuildCheckBox key={check.id} {...check} onChange={handleChange} />
          ))}
        </FormGroup>
        <Autocomplete
          multiple
          id="relatedBuilds"
          options={buildswShipType}
          getOptionLabel={(b) => b.title}
          groupBy={(b: BuildwShipType) => b.shipType}
          renderOption={(liprops, option) => <BuildOption shipBuild={option} {...liprops} />}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Related Builds" />
          )}
          isOptionEqualToValue={(option: IBuildInfov2, value: IBuildInfov2) =>
            option._id.toString() === value._id.toString()
          }
          value={newBuild.related.map((x) => builds.find((y) => y._id.toString() === x))}
          onChange={(_, value) => dispatch({ type: 'relateds', value: value })}
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
