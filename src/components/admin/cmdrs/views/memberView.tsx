import {
  Button,
  Checkbox,
  Divider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { IMember } from 'models/admin/cmdr';
import { PlatformString } from 'models/admin/platforms';
import { RankString } from 'models/admin/ranks';
import { RegionString } from 'models/admin/regions';
import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
} from 'react';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof IMember>(
  order: Order,
  orderBy: Key
): (a: IMember, b: IMember) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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
    disablePadding: true,
    label: 'Discord',
  },
  { id: 'joinDate', numeric: false, disablePadding: true, label: 'Join Date' },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  { id: 'rank', numeric: false, disablePadding: true, label: 'Rank' },
  {
    id: 'promotion',
    numeric: false,
    disablePadding: true,
    label: 'Rank Promotion',
  },
  {
    id: 'isInInaraSquad',
    numeric: false,
    disablePadding: true,
    label: 'Inara Squad',
  },
  { id: 'region', numeric: false, disablePadding: true, label: 'Region' },
  {
    id: 'entersVoice',
    numeric: false,
    disablePadding: true,
    label: 'Enters Voice',
  },
  {
    id: 'inaraLink',
    numeric: false,
    disablePadding: true,
    label: 'Inara Link',
  },
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

interface MemberTableProps {
  cmdrs: IMember[];
  deletedCmdrs: IMember[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}
const handleDate = (date) => {
  const newDate = new Date(date);
  return newDate > new Date('2019-01-01')
    ? newDate.toLocaleDateString('en-CA')
    : '';
};

export const MemberView = (props: MemberTableProps) => {
  const { cmdrs, selected, setSelected } = props;

  const classes = useStyles();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IMember>('cmdrName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof IMember
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = cmdrs.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, cmdrs.length - page * rowsPerPage);

  return (
    <>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
        component="div"
        count={cmdrs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
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
                    <TableCell>{handleDate(cmdr.joinDate)}</TableCell>
                    <TableCell>{handleDate(cmdr.discordJoinDate)}</TableCell>
                    <TableCell>{PlatformString[cmdr.platform]}</TableCell>
                    <TableCell>{RankString[cmdr.rank]}</TableCell>
                    <TableCell title="Promotion">
                      {!isNaN(cmdr.promotion) && cmdr.promotion > -1
                        ? RankString[cmdr.promotion]
                        : ''}
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={cmdr.isInInaraSquad} disabled />
                    </TableCell>
                    <TableCell>{RegionString[cmdr.region]}</TableCell>
                    <TableCell>
                      <Checkbox checked={cmdr.entersVoice} disabled />
                    </TableCell>
                    <TableCell>
                      {cmdr.inaraLink && (
                        <Button
                          href={cmdr.inaraLink}
                          variant="contained"
                          color="primary"
                          target="_blank"
                        >
                          Link
                        </Button>
                      )}
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
        component="div"
        count={cmdrs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};
