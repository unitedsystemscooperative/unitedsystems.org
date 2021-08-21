import {
  Checkbox,
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
import { Link } from '@material-ui/icons';
import { getComparator, Order, stableSort } from 'functions/sort';
import { IAmbassador } from 'models/admin/cmdr';
import { PlatformString } from 'models/admin/platforms';
import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
} from 'react';

interface HeadCell {
  disablePadding: boolean;
  id: keyof IAmbassador;
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
    disablePadding: true,
    label: 'Discord',
  },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  {
    id: 'groupRepresented',
    numeric: false,
    disablePadding: true,
    label: 'Group Represented',
  },
  {
    id: 'inaraLink',
    numeric: false,
    disablePadding: true,
    label: 'Group Link',
  },
  { id: 'notes', numeric: false, disablePadding: true, label: 'Note' },
];

interface TableHeadProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof IAmbassador
  ) => void;
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
  const createSortHandler = (property: keyof IAmbassador) => (
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
  cmdrs: IAmbassador[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof IAmbassador;
  handleSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRequestSort: (
    _: React.MouseEvent<unknown>,
    property: keyof IAmbassador
  ) => void;
  handleClick: (_: React.MouseEvent<unknown>, id: string) => void;
}

export const AmbassadorDefaultView = (props: MemberDefaultViewProps) => {
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
            {stableSort(cmdrs, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cmdr) => {
                const isItemSelected = isSelected(cmdr._id);
                return (
                  <TableRow
                    key={cmdr._id}
                    hover
                    onClick={(event) => handleClick(event, cmdr._id)}
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
                    <TableCell>{cmdr.discordName}</TableCell>
                    <TableCell>{handleDate(cmdr.discordJoinDate)}</TableCell>
                    <TableCell>{PlatformString[cmdr.platform]}</TableCell>
                    <TableCell>{cmdr.groupRepresented}</TableCell>
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
                    <TableCell>{cmdr.notes}</TableCell>
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
