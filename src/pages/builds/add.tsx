import {
  Button,
  Container,
  FormGroup,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { ChangeEvent, Fragment, MouseEvent, useEffect, useState } from 'react';
import { processJSONBuild } from 'functions/builds';
import { IShipInfo, IBuildInfoInsert } from 'models/builds';
import { QuerySpecialization } from 'components/builds/query/querySpecialities';
import { EngToggleGroup } from 'components/builds/engToggleGroup';
import { BuildAddText } from 'components/builds/builds/buildAddText';
import { ShipAutocomplete } from 'components/builds/shipAutocomplete';
import { BuildCheckBox } from 'components/builds/builds/buildCheckBox';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';
import { EDSpinner } from '@admiralfeb/react-components';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import qs from 'query-string';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    display: 'grid',
    gridTemplate: 'auto / 1fr',
    rowGap: '10px',
    padding: theme.spacing(1),
  },
  center: {
    textAlign: 'center',
    margin: '0 auto',
  },
}));

/**
 * Add Build Screen
 *
 * Used for all addition functions:
 *
 * - Normal Build
 * - Related Build
 * - Variant Build
 */
const AddBuild = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [jsonBuild, setJsonBuild] = useState('');
  const [buildInfo, setBuildInfo] = useState<IBuildInfoInsert>(DEFAULTBUILD);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const {
    loading,
    shipBuilds,
    addBuild,
    addRelated,
    addVariant,
  } = useShipBuilds();
  const urlQuery = useRouter().asPath;

  useEffect(() => {
    setBuildInfo((buildInfo) => {
      return { ...buildInfo, specializations: specialties };
    });
  }, [specialties]);

  const handleJSONChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJsonBuild(event.target.value);
    const {
      buildName,
      shipID,
      hasGuardian,
      hasPowerplay,
      engineering,
      url,
    } = processJSONBuild(event.target.value);
    const engLevel = engineering ? 1 : 0;
    const info: IBuildInfoInsert = {
      title: buildName,
      hasGuardian,
      hasPowerplay,
      buildLink: url,
      shipId: shipID,
      author: '',
      specializations: [],
      engLevel,
      isBeginner: false,
      description: '',
      isVariant: false,
      variants: [],
      related: [],
      jsonBuild: event.target.value,
    };
    setBuildInfo(info);
  };
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    switch (event.target.id) {
      case 'title':
        setBuildInfo((info) => {
          return { ...info, title: value };
        });
        break;
      case 'description':
        setBuildInfo((info) => {
          return { ...info, description: value };
        });
        break;
      case 'buildLink':
        setBuildInfo((info) => {
          return { ...info, buildLink: value };
        });
        break;
      case 'author':
        setBuildInfo((info) => {
          return { ...info, author: value };
        });
        break;
      default:
        break;
    }
  };
  const handleShipChange = (_, value: IShipInfo | null) => {
    if (value) {
      const ship = value.shipId;
      setBuildInfo((buildInfo) => {
        return { ...buildInfo, shipId: ship };
      });
    }
  };
  const handleEngLevelChange = (
    _: MouseEvent<HTMLElement>,
    engLevel: number
  ) => {
    setBuildInfo({ ...buildInfo, engLevel });
  };
  const handleOtherChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBuildInfo({ ...buildInfo, [event.target.name]: event.target.checked });
  };
  const handleSubmit = async () => {
    try {
      if (buildInfo.jsonBuild === '') {
        throw new Error(
          'Exported JSON is blank. Verify you have pasted the JSON from Coriolis.'
        );
      }
      if (buildInfo.specializations.length < 1) {
        throw new Error(
          'No specializations have been selected. Minimum is one.'
        );
      }
      if (buildInfo.author === '') {
        throw new Error('Author is blank.');
      }
      if (buildInfo.description === '') {
        throw new Error('More Information is blank.');
      }
      if (buildInfo.title === '') {
        throw new Error(
          'Build Title is blank. Verify you have pasted the JSON from Coriolis.'
        );
      }
      if (buildInfo.buildLink === '') {
        throw new Error(
          'Build Link is blank. Verify you have pasted the JSON from Coriolis.'
        );
      }
      const params = qs.parse(urlQuery.substring(urlQuery.indexOf('?')));
      const addType = Array.isArray(params['type'])
        ? params['type'][0]
        : params['type'];
      console.log(addType);
      const refID = Array.isArray(params['refID'])
        ? params['refID'][0]
        : params['refID'];
      try {
        switch (addType) {
          case 'variant':
            if (refID) {
              await addVariant(refID, shipBuilds, buildInfo);
            } else {
              throw new Error('Build reference ID missing from URL');
            }
            break;
          case 'related':
            if (refID) {
              await addRelated(refID, shipBuilds, buildInfo);
            } else {
              throw new Error('Build reference ID missing from URL');
            }
            break;
          default:
            await addBuild(buildInfo);
            break;
        }
        enqueueSnackbar('Build Successfully Submitted', {
          variant: 'success',
        });
        setBuildInfo({ ...DEFAULTBUILD });
        setSpecialties([]);
        setJsonBuild('');
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
      value: jsonBuild,
      onChange: handleJSONChange,
    },
    {
      id: 'title',
      label: 'Title',
      isMultiline: false,
      value: buildInfo.title,
      onChange: handleTextChange,
      disabled: false,
    },
    {
      id: 'description',
      label: 'More Information - Accepts markdown',
      isMultiline: true,
      value: buildInfo.description,
      onChange: handleTextChange,
    },
    {
      id: 'buildLink',
      label: 'Build Link - Full',
      isMultiline: false,
      value: buildInfo.buildLink,
      onChange: handleTextChange,
      disabled: true,
    },
    // {
    //   id: 'variant',
    //   label: 'Variant Build IDs - If applicable - separated by commas',
    //   isMultiline: false,
    //   value: buildInfo.variants.join(','),
    //   onChange: handleTextChange,
    // },
    // {
    //   id: 'related',
    //   label: 'Related Build IDs - If applicable - separated by commas',
    //   isMultiline: false,
    //   value: buildInfo.related.join(','),
    //   onChange: handleTextChange,
    // },
    {
      id: 'author',
      label: 'Author',
      isMultiline: false,
      value: buildInfo.author,
      onChange: handleTextChange,
    },
  ];

  const checkFields = [
    {
      label: 'Guardian',
      name: 'hasGuardian',
      checked: buildInfo.hasGuardian,
      disabled: true,
    },
    {
      label: 'PowerPlay',
      name: 'hasPowerplay',
      checked: buildInfo.hasPowerplay,
      disabled: true,
    },
    { label: 'Beginner', name: 'isBeginner', checked: buildInfo.isBeginner },
  ];

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <>
      <Head>
        <title>USC Add Build</title>
        <meta name="description" content="Add Builld Form" />
      </Head>
      <Container maxWidth="lg">
        <Typography variant="h3" className={classes.center}>
          Add Build Form
        </Typography>
        <Paper className={classes.root}>
          <NextLink href="/builds" passHref>
            <Button color="secondary" variant="outlined">
              Return to builds
            </Button>
          </NextLink>
          <Typography>
            Save your build in Coriolis and choose Export. Paste the exported
            JSON into the Exported JSON field.
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
            shipType={buildInfo.shipId}
            handleShipChange={handleShipChange}
          />
          <QuerySpecialization
            selectedSpecialties={buildInfo.specializations}
            setSpecialties={(value) => setSpecialties(value)}
          />
          <div className={classes.center}>
            <EngToggleGroup
              engLevel={buildInfo.engLevel}
              handleEngLevelChange={handleEngLevelChange}
            />
          </div>
          <FormGroup row className={classes.center}>
            {checkFields.map((check) => (
              <BuildCheckBox
                key={check.name}
                {...check}
                onChange={handleOtherChange}
              />
            ))}
          </FormGroup>
          <Button onClick={handleSubmit} variant="outlined">
            Submit Build
          </Button>
        </Paper>
      </Container>
    </>
  );
};

const DEFAULTBUILD: IBuildInfoInsert = {
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

export default AddBuild;
