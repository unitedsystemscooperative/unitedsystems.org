import { EDSpinner, UnderConstruction } from '@admiralfeb/react-components';
import {
  Button,
  Collapse,
  Container,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add, Delete, Edit, FilterList } from '@material-ui/icons';
import { useCMDRs } from 'hooks/useCmdrs';
import { ICMDR } from 'models/admin/cmdr';
import React, { MouseEvent, useEffect, useState } from 'react';
import { MemberView } from './views/memberView';

const useTitleBarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    '& button': {
      margin: theme.spacing(1),
    },
  },
  title: {
    flex: '2 1 100%',
    textAlign: 'left',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
  },
}));

interface TitleBarProps {
  view: CmdrView;
  setView: (CmdrView) => void;
  selectedCount: number;
  addCMDR: () => void;
  editCMDR: () => void;
  deleteCMDR: () => void;
}

const viewOptions = ['Ambassadors', 'Guests', 'Members'];

const DashboardTitleBar = (props: TitleBarProps) => {
  const classes = useTitleBarStyles();
  const { view, setView, selectedCount, addCMDR, editCMDR, deleteCMDR } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [titleText, setTitleText] = useState('');
  useEffect(() => {
    switch (view) {
      case CmdrView.Ambassador:
        setTitleText('Ambassadors');
        break;
      case CmdrView.Guest:
        setTitleText('Guests');
        break;
      case CmdrView.Member:
        setTitleText('Members');
        break;
      default:
        setTitleText('');
        break;
    }
  }, [view]);

  const handleViewFilterClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleViewMenuClick = (_: MouseEvent<HTMLElement>, index: number) => {
    setView(index);
    setAnchorEl(null);
  };
  const handleViewFilterClose = () => setAnchorEl(null);

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h4" component="div" className={classes.title}>
        CMDR Management - {titleText}
      </Typography>
      <Tooltip title="Add a cmdr" arrow>
        <Button variant="contained" color="primary" onClick={() => addCMDR()}>
          <Add />
        </Button>
      </Tooltip>
      <Tooltip title="Edit cmdr(s)" arrow>
        <Button
          variant="contained"
          color="primary"
          onClick={() => editCMDR()}
          disabled={selectedCount < 1}
        >
          <Edit />
        </Button>
      </Tooltip>
      <Tooltip title="Delete cmdr(s)" arrow>
        <Button
          variant="contained"
          color="primary"
          onClick={deleteCMDR}
          disabled={selectedCount < 1}
        >
          <Delete />
        </Button>
      </Tooltip>
      <Tooltip title="Select between Ambassadors, Guests, and Members" arrow>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewFilterClick}
        >
          <FilterList />
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleViewFilterClose}
      >
        {viewOptions.map((option, index) => (
          <MenuItem
            key={option}
            onClick={(event) => handleViewMenuClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Toolbar>
  );
};

enum CmdrView {
  Ambassador,
  Guest,
  Member,
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

export const CMDRDashboard = () => {
  const classes = useStyles();
  const { cmdrs, loading, addCMDR, updateCMDR, deleteCMDR } = useCMDRs();
  const { members, guests, ambassadors } = cmdrs;

  const [cmdrView, setCmdrView] = useState<CmdrView>(CmdrView.Member);
  const [selectedCmdrs, setSelectedCmdrs] = useState<string[]>([]);

  const handleDelete = async () => {
    await deleteCMDR(selectedCmdrs);
    setSelectedCmdrs([]);
  };

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <Container maxWidth="xl" component={Paper} className={classes.root}>
      <DashboardTitleBar
        view={cmdrView}
        setView={setCmdrView}
        selectedCount={selectedCmdrs.length}
        addCMDR={() => null}
        editCMDR={() => null}
        deleteCMDR={handleDelete}
      />
      <Collapse in={cmdrView === CmdrView.Member} mountOnEnter unmountOnExit>
        <MemberView
          cmdrs={members.filter((x) => !x.isDeleted)}
          deletedCmdrs={members.filter((x) => x.isDeleted)}
          selected={selectedCmdrs}
          setSelected={setSelectedCmdrs}
        />
      </Collapse>
      <Collapse
        in={cmdrView === CmdrView.Ambassador}
        mountOnEnter
        unmountOnExit
      >
        <UnderConstruction title="Ambassadors" />
      </Collapse>
      <Collapse in={cmdrView === CmdrView.Guest} mountOnEnter unmountOnExit>
        <UnderConstruction title="Guests" />
      </Collapse>
    </Container>
  );
};
