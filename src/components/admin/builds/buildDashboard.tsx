import { EDSpinner } from '@admiralfeb/react-components';
import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Container,
  IconButton,
  IconButtonProps,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { EngIcons } from 'components/builds/builds/engIcons';
import { TagGroup } from 'components/builds/builds/tagGroup';
import { BuildDialog } from 'components/builds/dialog/buildDialog';
import { ConfirmDialog } from 'components/confirmDialog';
import { TitleBarwAdd } from 'components/_common';
import { genericSortArray, Order } from 'functions/sort';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';
import { useShipMap } from 'hooks/builds/useShipMap';
import { IBuildInfov2, IShipInfo } from 'models/builds';
import { MouseEvent, useReducer, useState } from 'react';

const StyledIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(1),
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
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof IBuildInfov2
  ) => void;
  order: Order;
  orderBy: string;
}
const BuildTableHead = (props: TableHeadProps) => {
  const { order, orderBy, onRequestSort } = props;
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
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
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
  onDelete: (build: IBuildInfov2) => void;
  onEdit: (build: IBuildInfov2) => void;
}
const BuildTable = ({ builds, onDelete, onEdit }: BuildTableProps) => {
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
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {genericSortArray(builds, { order, orderBy }).map(
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
                    <StyledIconButton
                      onClick={() => onEdit(build)}
                      size="large"
                    >
                      <Edit />
                    </StyledIconButton>
                  </TableCell>
                  <TableCell>
                    <StyledIconButton
                      onClick={() => onDelete(build)}
                      size="large"
                    >
                      <Delete />
                    </StyledIconButton>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type action = {
  type: 'add' | 'delete' | 'edit' | 'confirm' | 'cancel';
  value?: IBuildInfov2;
};

export const BuildDashboard = () => {
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
      <TitleBarwAdd
        title="Build Management"
        addTip="Add a build"
        addItem={() => dispatch({ type: 'add' })}
      />
      <BuildTable
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
