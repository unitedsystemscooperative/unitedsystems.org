import { EDSpinner } from '@admiralfeb/react-components';
import {
  Button,
  Collapse,
  Container,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Add, Delete, Edit, FilterList } from '@mui/icons-material';
import { useCMDRs } from 'hooks/useCmdrs';
import { IAmbassador, IGuest, IMember } from 'models/admin/cmdr';
import { useSnackbar } from 'notistack';
import { MouseEvent, useState } from 'react';
import { AmbassadorDashboard } from './ambassadorDashboard';
import { AmbassadorDialog } from './dialogs/ambassadorDialog';
import { GuestDialog } from './dialogs/guestDialog';
import { MemberDialog } from './dialogs/memberDialog';
import { GuestDashboard } from './guestDashboard';
import { MemberDashboard } from './memberDashboard';

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
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
  },
}));

interface TitleBarProps {
  setView: (CmdrView) => void;
  selectedCount: number;
  addCMDR: () => void;
  editCMDR: () => void;
  deleteCMDR: () => void;
}

const DashboardTitleBar = (props: TitleBarProps) => {
  const classes = useTitleBarStyles();
  const { setView, selectedCount, addCMDR, editCMDR, deleteCMDR } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleViewFilterClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleViewMenuClick = (_: MouseEvent<HTMLElement>, option: string) => {
    setView(option);
    setAnchorEl(null);
  };
  const handleViewFilterClose = () => setAnchorEl(null);

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h4" component="div" className={classes.title}>
        CMDR Management
      </Typography>
      <Tooltip title="Add a cmdr" arrow>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addCMDR()}
          disabled={selectedCount !== 0}
        >
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {Object.keys(CmdrView).map((option) => (
          <MenuItem
            key={option}
            onClick={(event) => handleViewMenuClick(event, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Toolbar>
  );
};

enum CmdrView {
  Ambassadors = 'Ambassadors',
  Guests = 'Guests',
  Members = 'Members',
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
  const {
    cmdrs,
    loading,
    addCMDR,
    updateCMDR,
    updateCMDRs,
    deleteCMDR,
    restoreCMDR,
  } = useCMDRs();
  const { enqueueSnackbar } = useSnackbar();
  const { members, guests, ambassadors } = cmdrs;

  const [cmdrView, setCmdrView] = useState<CmdrView>(CmdrView.Members);
  const [selectedCmdrs, setSelectedCmdrs] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState<CmdrView | undefined>(undefined);
  const [ambassadorDialogValues, setAmbassadorDialogValues] = useState<
    IAmbassador[] | undefined
  >(undefined);
  const [guestDialogValues, setGuestDialogValues] = useState<
    IGuest[] | undefined
  >(undefined);
  const [memberDialogValues, setMemberDialogValues] = useState<
    IMember[] | undefined
  >(undefined);

  const handleShowDialog = () => {
    switch (cmdrView) {
      case CmdrView.Ambassadors:
        const ambassadorsToEdit = ambassadors.filter((x) =>
          selectedCmdrs.includes(x._id.toString())
        );
        setAmbassadorDialogValues(ambassadorsToEdit);
        setShowDialog(CmdrView.Ambassadors);
        break;
      case CmdrView.Guests:
        const guestsToEdit = guests.filter((x) =>
          selectedCmdrs.includes(x._id.toString())
        );
        setGuestDialogValues(guestsToEdit);
        setShowDialog(CmdrView.Guests);
        break;
      case CmdrView.Members:
        const membersToEdit = members.filter((x) =>
          selectedCmdrs.includes(x._id.toString())
        );
        setMemberDialogValues(membersToEdit);
        setShowDialog(CmdrView.Members);
        break;
      default:
        break;
    }
  };

  const handleCloseDialog = async (
    returnedCmdr?: IMember | IGuest | IAmbassador,
    returnedCmdrs?: IMember[] | IGuest[] | IAmbassador[]
  ) => {
    setShowDialog(undefined);

    if (returnedCmdrs && returnedCmdrs.length > 1) {
      try {
        await updateCMDRs(returnedCmdrs, returnedCmdr);
        setSelectedCmdrs([]);
      } catch (e) {
        enqueueSnackbar(`Failed to add or update CMDR. Reason: ${e.message}`, {
          variant: 'error',
        });
      }
    } else if (returnedCmdrs && returnedCmdrs.length === 1) {
      try {
        if (returnedCmdrs[0]._id) {
          await updateCMDR(returnedCmdrs[0]);
        } else {
          await addCMDR(returnedCmdrs[0]);
        }
        setSelectedCmdrs([]);
      } catch (e) {
        enqueueSnackbar(`Failed to add or update CMDR. Reason: ${e.message}`, {
          variant: 'error',
        });
      }
    } else if (returnedCmdr) {
      try {
        if (returnedCmdr._id) {
          await updateCMDR(returnedCmdr);
        } else {
          await addCMDR(returnedCmdr);
        }
        setSelectedCmdrs([]);
      } catch (e) {
        enqueueSnackbar(`Failed to add or update CMDR. Reason: ${e.message}`, {
          variant: 'error',
        });
      }
    }
  };

  const handleRestore = async (cmdr: IAmbassador | IGuest | IMember) => {
    await restoreCMDR(cmdr);
    setSelectedCmdrs([]);
  };

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
        setView={setCmdrView}
        selectedCount={selectedCmdrs.length}
        addCMDR={() => handleShowDialog()}
        editCMDR={() => handleShowDialog()}
        deleteCMDR={handleDelete}
      />
      <Collapse in={cmdrView === CmdrView.Members} mountOnEnter unmountOnExit>
        <MemberDashboard
          cmdrs={members.filter((x) => !x.isDeleted)}
          deletedCmdrs={members.filter((x) => x.isDeleted)}
          promoCmdrs={members.filter((x) => !x.isDeleted && x.promotion)}
          selected={selectedCmdrs}
          setSelected={setSelectedCmdrs}
          restoreCMDR={handleRestore}
        />
        <MemberDialog
          open={showDialog === CmdrView.Members}
          values={memberDialogValues}
          onClose={handleCloseDialog}
        />
      </Collapse>
      <Collapse
        in={cmdrView === CmdrView.Ambassadors}
        mountOnEnter
        unmountOnExit
      >
        <AmbassadorDashboard
          cmdrs={ambassadors.filter((x) => !x.isDeleted)}
          deletedCmdrs={ambassadors.filter((x) => x.isDeleted)}
          selected={selectedCmdrs}
          setSelected={setSelectedCmdrs}
          restoreCMDR={restoreCMDR}
        />
        <AmbassadorDialog
          open={showDialog === CmdrView.Ambassadors}
          values={ambassadorDialogValues}
          onClose={handleCloseDialog}
        />
      </Collapse>
      <Collapse in={cmdrView === CmdrView.Guests} mountOnEnter unmountOnExit>
        <GuestDashboard
          cmdrs={guests.filter((x) => !x.isDeleted)}
          deletedCmdrs={guests.filter((x) => x.isDeleted)}
          selected={selectedCmdrs}
          setSelected={setSelectedCmdrs}
          restoreCMDR={restoreCMDR}
        />
        <GuestDialog
          open={showDialog === CmdrView.Guests}
          values={guestDialogValues}
          onClose={handleCloseDialog}
        />
      </Collapse>
    </Container>
  );
};
