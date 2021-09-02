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
import { RestoreFromTrash } from '@material-ui/icons';
import Link from '@material-ui/icons/Link';
import { genericSortArray, Order } from 'functions/sort';
import { ICMDR } from 'models/admin/cmdr';
import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
} from 'react';
export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

export const useCmdrTableStyles = makeStyles((theme) => ({
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

export const handleDate = (date) => {
  const newDate = new Date(date);
  return newDate > new Date('2019-01-01')
    ? newDate.toLocaleDateString('en-CA')
    : '';
};

export interface CmdrTableHeadProps<T> {
  classes: ReturnType<typeof useCmdrTableStyles>;
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof T;
  rowCount: number;
  headCells: HeadCell<T>[];
}

export const CmdrTableHead = <T,>(props: CmdrTableHeadProps<T>) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property: keyof T) => (
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
            key={headCell.id.toString()}
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
interface CmdrTableRowProps<T extends ICMDR> {
  cmdr: T;
  handleClick: (event: MouseEvent<HTMLTableRowElement>, id: string) => void;
  isItemSelected: boolean;
  children: ReactNode;
}
export const CmdrTableRow = <T extends ICMDR>({
  cmdr,
  handleClick,
  isItemSelected,
  children,
}: CmdrTableRowProps<T>) => {
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
      {children}
    </TableRow>
  );
};

export type ViewData =
  | { type: 'string'; data: string }
  | { type: 'boolean'; data: boolean }
  | { type: 'link'; data?: string };

export const renderData = (data: ViewData[]) => {
  return data.map((item) => {
    switch (item.type) {
      case 'string':
        return <TableCell>{item.data}</TableCell>;
      case 'boolean':
        return (
          <TableCell>
            <Checkbox checked={item.data} disabled />
          </TableCell>
        );
      case 'link':
        return (
          <TableCell>
            {item.data && (
              <IconButton
                href={item.data}
                color="primary"
                size="small"
                target="_blank"
              >
                <Link />
              </IconButton>
            )}
          </TableCell>
        );

      default:
        break;
    }
  });
};

export interface CmdrDefaultViewProps<T extends ICMDR> {
  cmdrs: T[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof T;
  handleSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRequestSort: (_: React.MouseEvent<unknown>, property: keyof T) => void;
  handleClick: (_: React.MouseEvent<unknown>, id: string) => void;
  headCells: HeadCell<T>[];
  data: (cmdr: T) => ViewData[];
  restoreCmdr?: (cmdr: T) => Promise<void>;
}
export const CmdrDefaultView = <T extends ICMDR>(
  props: CmdrDefaultViewProps<T>
) => {
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
    headCells,
    data,
    restoreCmdr,
  } = props;

  const classes = useCmdrTableStyles();

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, cmdrs.length - page * rowsPerPage);

  return (
    <>
      <TableContainer>
        <Table size="small">
          <CmdrTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={cmdrs.length}
            headCells={headCells}
          />
          <TableBody>
            {genericSortArray(cmdrs, { orderBy, order })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((cmdr) => {
                const isItemSelected = isSelected(cmdr._id.toString());
                return (
                  <CmdrTableRow
                    key={cmdr._id.toString()}
                    cmdr={cmdr}
                    isItemSelected={isItemSelected}
                    handleClick={handleClick}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    {renderData(data(cmdr))}
                    {restoreCmdr && (
                      <TableCell>
                        <IconButton onClick={() => restoreCmdr(cmdr)}>
                          <RestoreFromTrash />
                        </IconButton>
                      </TableCell>
                    )}
                  </CmdrTableRow>
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
