import {
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { genericSortArray, Order } from 'functions/sort';
import { IMember } from 'models/admin/cmdr';
import { PlatformString } from 'models/admin/platforms';
import { ReferralString } from 'models/admin/referrals';
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
  { id: 'joinDate', numeric: false, disablePadding: true, label: 'Join Date' },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  { id: 'ref1', numeric: false, disablePadding: true, label: 'Reference' },
  { id: 'ref2', numeric: false, disablePadding: true, label: 'Explanation' },
];

interface TableHeadProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof IMember) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const MemberTableHead = (props: TableHeadProps) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof IMember) => (
    event: MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all commanders' }}
          />
        </TableCell>
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
}

export const MemberRefView = (props: MemberDefaultViewProps) => {
  const {
    cmdrs,
    selected,
    page,
    rowsPerPage,
    order,
    orderBy,
    handleSelectAllClick,
    handleRequestSort,
    handleClick,
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
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={cmdrs.length}
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
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {cmdr.cmdrName.toUpperCase()}
                    </TableCell>
                    <TableCell>{handleDate(cmdr.joinDate)}</TableCell>
                    <TableCell>{handleDate(cmdr.discordJoinDate)}</TableCell>
                    <TableCell>{PlatformString[cmdr.platform]}</TableCell>
                    <TableCell>{ReferralString[cmdr.ref1]}</TableCell>
                    <TableCell>{cmdr.ref2}</TableCell>
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
