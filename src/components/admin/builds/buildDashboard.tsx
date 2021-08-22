import { EDSpinner } from '@admiralfeb/react-components';
import {
  Button,
  Checkbox,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import { EngIcons } from 'components/builds/builds/engIcons';
import { TagGroup } from 'components/builds/builds/tagGroup';
import { BuildDialog } from 'components/builds/dialog/buildDialog';
import { ConfirmDialog } from 'components/confirmDialog';
import { getComparator, Order, stableSort } from 'functions/sort';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';
import { useShipMap } from 'hooks/builds/useShipMap';
import { IBuildInfov2, IShipInfo } from 'models/builds';
import { MouseEvent, useReducer, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

interface HeadCell {
  disablePadding: boolean;
  id: keyof IBuildInfov2;
  label: string;
  numeric: boolean;
}
const headCells: HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'shipId',
    numeric: false,
    disablePadding: false,
    label: 'Ship',
  },
  {
    id: 'author',
    numeric: false,
    disablePadding: false,
    label: 'Author',
  },
  {
    id: 'specializations',
    numeric: false,
    disablePadding: false,
    label: 'Specializations',
  },
  {
    id: 'engLevel',
    numeric: false,
    disablePadding: false,
    label: 'Eng Level',
  },
  {
    id: 'hasGuardian',
    numeric: false,
    disablePadding: false,
    label: 'Guardian?',
  },
  {
    id: 'hasPowerplay',
    numeric: false,
    disablePadding: false,
    label: 'PowerPlay?',
  },
  {
    id: 'isBeginner',
    numeric: false,
    disablePadding: false,
    label: 'Beginner?',
  },
];

interface TableHeadProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof IBuildInfov2
  ) => void;
  order: Order;
  orderBy: string;
}
const BuildTableHead = (props: TableHeadProps) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof IBuildInfov2) => (
    event: MouseEvent<unknown>
  ) => onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Edit</TableCell>
        <TableCell>Delete</TableCell>
      </TableRow>
    </TableHead>
  );
};

const handleShipInfo = (shipId: string, ships: IShipInfo[]) => {
  const info = ships.find((x) => x.shipId === shipId);
  return info;
};

interface BuildTableProps {
  builds: IBuildInfov2[];
  classes: ReturnType<typeof useStyles>;
  onDelete: (build: IBuildInfov2) => void;
  onEdit: (build: IBuildInfov2) => void;
}
const BuildTable = ({ builds, classes, onDelete, onEdit }: BuildTableProps) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IBuildInfov2>('title');
  const ships = useShipMap();

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof IBuildInfov2
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <BuildTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(builds, getComparator(order, orderBy)).map(
            (build: IBuildInfov2) =>
              build._id && (
                <TableRow key={build._id.toString()}>
                  <TableCell component="th" scope="row" padding="normal">
                    {build.title}
                  </TableCell>
                  <TableCell>
                    {handleShipInfo(build.shipId, ships).name ?? ''}
                  </TableCell>
                  <TableCell>{build.author}</TableCell>
                  <TableCell padding="none">
                    <TagGroup build={build} />
                  </TableCell>
                  <TableCell padding="none">
                    <EngIcons engLevel={build.engLevel} ditchText />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={build.hasGuardian} disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={build.hasPowerplay} disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={build.isBeginner} disabled />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit(build)}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => onDelete(build)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
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
const DashBoardTitleBar = ({ addBuild }: { addBuild: () => void }) => {
  const classes = useTitleBarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography variant="h4" component="div" className={classes.title}>
        USC Build Management
      </Typography>
      <Tooltip title="Add a build" arrow>
        <Button variant="contained" color="primary" onClick={addBuild}>
          <Add />
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

type action = {
  type: 'add' | 'delete' | 'edit' | 'confirm' | 'cancel';
  value?: IBuildInfov2;
};

export const BuildDashboard = () => {
  const classes = useStyles();
  const { loading, shipBuilds, deleteBuild } = useShipBuilds();
  const reducer = (prevState: action, action: action): action => {
    switch (action.type) {
      case 'cancel':
        return { type: 'cancel' };
      case 'confirm':
        if (prevState.type === 'delete') {
          console.log('delete confirmed for', prevState.value);
          deleteBuild(prevState.value._id.toString());
        }
        return { type: 'cancel' };
      case 'delete':
        return { type: 'delete', value: action.value };
      case 'edit':
        return { type: 'edit', value: action.value };
      case 'add':
        return { type: 'add' };
      default:
        return { type: 'cancel' };
    }
  };
  const [state, dispatch] = useReducer(reducer, { type: 'cancel' });

  if (loading) return <EDSpinner />;

  return (
    <Container maxWidth="xl">
      <DashBoardTitleBar addBuild={() => dispatch({ type: 'add' })} />
      <BuildTable
        classes={classes}
        builds={shipBuilds}
        onDelete={(build: IBuildInfov2) =>
          dispatch({ type: 'delete', value: build })
        }
        onEdit={(build: IBuildInfov2) =>
          dispatch({ type: 'edit', value: build })
        }
      />
      <ConfirmDialog
        title="Delete"
        open={state.type === 'delete'}
        onClose={() => dispatch({ type: 'cancel' })}
        onConfirm={() => dispatch({ type: 'confirm' })}
      >
        Are you sure you want to delete build '{state.value?.title}'?
      </ConfirmDialog>
      <BuildDialog
        open={state.type === 'edit' || state.type === 'add'}
        build={state.value}
        onClose={() => dispatch({ type: 'cancel' })}
      />
    </Container>
  );
};
