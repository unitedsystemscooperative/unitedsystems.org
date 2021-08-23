import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { Link } from '@material-ui/icons';
import { genericSortArray } from 'functions/sort';
import { IAmbassador } from 'models/admin/cmdr';
import { PlatformString } from 'models/admin/platforms';
import React from 'react';
import {
  CmdrDefaultViewProps,
  CmdrTableHead,
  CmdrTableRow,
  handleDate,
  HeadCell,
  useCmdrTableStyles,
} from './commonView';

const headCells: HeadCell<IAmbassador>[] = [
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
export const AmbassadorDefaultView = (
  props: CmdrDefaultViewProps<IAmbassador>
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
            {genericSortArray(cmdrs, { order, orderBy })
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
