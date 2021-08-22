import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { Link, RestoreFromTrash } from '@material-ui/icons';
import { genericSortArray, Order } from 'functions/sort';
import { IMember } from 'models/admin/cmdr';
import { PlatformString } from 'models/admin/platforms';
import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
} from 'react';

interface HeadCell {
  disablePadding: boolean;
  id: keyof IMember;
  label: string;
  numeric: boolean;
}
const headCells: HeadCell[] = [
  {
    id: 'cmdrName',
    numeric: false,
    disablePadding: false,
    label: 'CMDR Name',
  },
  {
    id: 'discordName',
    numeric: false,
    disablePadding: false,
    label: 'Discord Handle',
  },
  { id: 'joinDate', numeric: false, disablePadding: true, label: 'Join Date' },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  { id: 'notes', numeric: false, disablePadding: true, label: 'Note' },
  {
    id: 'inaraLink',
    numeric: false,
    disablePadding: true,
    label: 'Inara Link',
  },
  {
    id: 'isDeleted',
    numeric: false,
    disablePadding: true,
    label: 'Restore',
  },
];

interface TableHeadProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof IMember) => void;
  order: Order;
  orderBy: string;
}

const MemberTableHead = (props: TableHeadProps) => {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof IMember) => (
    event: MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
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
      </TableRow>
    </TableHead>
  );
};

const handleDate = (date) => {
  const newDate = new Date(date);
  return newDate > new Date('2019-01-01')
    ? newDate.toLocaleDateString('en-CA')
    : '';
};

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

interface MemberDefaultViewProps {
  cmdrs: IMember[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof IMember;
  handleSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRequestSort: (
    _: React.MouseEvent<unknown>,
    property: keyof IMember
  ) => void;
  handleClick: (_: React.MouseEvent<unknown>, id: string) => void;
  handleRestore: (cmdr: IMember) => Promise<void>;
}

export const MemberDeletedView = (props: MemberDefaultViewProps) => {
  const {
    cmdrs,
    selected,
    page,
    rowsPerPage,
    order,
    orderBy,
    handleRequestSort,
    handleClick,
    handleRestore,
  } = props;

  const classes = useStyles();

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, cmdrs.length - page * rowsPerPage);

  return (
    <>
      <TableContainer>
        <Table size="small">
          <MemberTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {genericSortArray(cmdrs, { order, orderBy })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cmdr) => {
                const isItemSelected = isSelected(cmdr._id.toString());
                return (
                  <TableRow
                    key={cmdr._id.toString()}
                    hover
                    onClick={(event) => handleClick(event, cmdr._id.toString())}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      {cmdr.cmdrName.toUpperCase()}
                    </TableCell>
                    <TableCell>{cmdr.discordName}</TableCell>
                    <TableCell>{handleDate(cmdr.joinDate)}</TableCell>
                    <TableCell>{handleDate(cmdr.discordJoinDate)}</TableCell>
                    <TableCell>{PlatformString[cmdr.platform]}</TableCell>
                    <TableCell>{cmdr.notes}</TableCell>
                    <TableCell>
                      {cmdr.inaraLink && (
                        <IconButton
                          href={cmdr.inaraLink}
                          color="primary"
                          size="small"
                          target="_blank"
                        >
                          <Link />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleRestore(cmdr)}
                      >
                        <RestoreFromTrash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 66 * emptyRows }}>
                <TableCell colSpan={12} />{' '}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
