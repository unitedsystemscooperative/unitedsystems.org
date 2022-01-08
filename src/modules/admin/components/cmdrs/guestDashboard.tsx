import { Order } from '@/functions/sort';
import { useCmdrSearch } from '@/hooks/useCmdrSearch';
import { IGuest } from '~/admin/models';
import { Divider, TablePagination } from '@mui/material';
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import { DashboardToolbar } from './dashboardToolbar';
import { CmdrDefaultView, HeadCell, ViewData } from './views/commonView';
import {
  guestDefaultData,
  guestDefaultHeadCells,
  guestDeletedData,
  guestDeletedHeadCells,
} from './views/guestViews';

enum GuestViews {
  Default = 'Default',
  Deleted = 'Deleted',
}

const guestViews = Object.keys(GuestViews);

interface GuestDashboardProps {
  cmdrs: IGuest[];
  deletedCmdrs: IGuest[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  restoreCMDR: (cmdr: IGuest) => Promise<void>;
}

export const GuestDashboard = (props: GuestDashboardProps) => {
  const { cmdrs, selected, setSelected, deletedCmdrs, restoreCMDR } = props;

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IGuest>('cmdrName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ambassadorView, setMemberView] = useState(GuestViews.Default);
  const [searchValue, setSearchValue] = useState('');
  const filteredCmdrs = useCmdrSearch({ searchValue, cmdrs });
  const filteredDeletedCmdrs = useCmdrSearch({
    searchValue,
    cmdrs: deletedCmdrs,
  });

  useEffect(() => {
    setPage(0);
  }, [filteredCmdrs.length]);

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof IGuest) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = filteredCmdrs.map((n) => n._id.toString());
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: MouseEvent<unknown>, id: string) => {
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

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const processView = (view: GuestViews) => {
    let headCells: HeadCell<IGuest>[];
    let data: (cmdr: IGuest) => ViewData[];
    switch (view) {
      default:
        headCells = guestDefaultHeadCells;
        data = guestDefaultData;
        break;
    }
    switch (view) {
      case GuestViews.Deleted:
        return (
          <>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
              component="div"
              count={filteredDeletedCmdrs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <CmdrDefaultView
              cmdrs={filteredDeletedCmdrs}
              selected={selected}
              setSelected={setSelected}
              page={page}
              rowsPerPage={rowsPerPage}
              order={order}
              orderBy={orderBy}
              handleSelectAllClick={handleSelectAllClick}
              handleRequestSort={handleRequestSort}
              handleClick={handleClick}
              headCells={guestDeletedHeadCells}
              data={guestDeletedData}
              restoreCmdr={restoreCMDR}
            />
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
              component="div"
              count={filteredDeletedCmdrs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        );
        break;
      default:
        return (
          <>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
              component="div"
              count={filteredCmdrs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <CmdrDefaultView
              cmdrs={filteredCmdrs}
              selected={selected}
              setSelected={setSelected}
              page={page}
              rowsPerPage={rowsPerPage}
              order={order}
              orderBy={orderBy}
              handleSelectAllClick={handleSelectAllClick}
              handleRequestSort={handleRequestSort}
              handleClick={handleClick}
              headCells={headCells}
              data={data}
            />
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
              component="div"
              count={filteredCmdrs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        );
    }
  };

  return (
    <>
      <DashboardToolbar
        title="Guests"
        viewOptions={guestViews}
        view={ambassadorView}
        setView={setMemberView}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Divider />
      {processView(ambassadorView)}
    </>
  );
};
