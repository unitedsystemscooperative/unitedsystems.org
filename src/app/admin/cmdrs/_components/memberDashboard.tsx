import { Order } from '@/functions/sort';
import { useCmdrSearch } from '@/hooks/useCmdrSearch';
import { IMember } from '@/app/admin/_models';
import { Divider, TablePagination } from '@mui/material';
import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import { DashboardToolbar } from './dashboardToolbar';
import { CmdrDefaultView, HeadCell, ViewData } from './views/commonView';
import {
  memberDefaultData,
  memberDefaultHeadCells,
  memberDeletedData,
  memberDeletedHeadCells,
  memberNoteData,
  memberNoteHeadCells,
  memberPromotionData,
  memberPromotionHeadCells,
  memberRefData,
  memberRefHeadCells,
} from './views/memberViews';

enum MemberViews {
  Default = 'Default',
  Notes = 'Notes',
  Reference = 'Reference',
  Promotions = 'Promotions',
  Deleted = 'Deleted',
}

const memberViews = Object.keys(MemberViews);
// const memberViews = ['Default', 'Notes', 'Reference', 'Promotions', 'Deleted'];

interface MemberDashboardProps {
  cmdrs: IMember[];
  deletedCmdrs: IMember[];
  promoCmdrs: IMember[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  restoreCMDR: (cmdr: IMember) => Promise<void>;
}

export const MemberDashboard = (props: MemberDashboardProps) => {
  const { cmdrs, selected, setSelected, deletedCmdrs, promoCmdrs, restoreCMDR } = props;

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IMember>('cmdrName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [memberView, setMemberView] = useState(MemberViews.Default);
  const [searchValue, setSearchValue] = useState('');

  const filteredCmdrs = useCmdrSearch({ searchValue, cmdrs });
  const filteredDeletedCmdrs = useCmdrSearch({
    searchValue,
    cmdrs: deletedCmdrs,
  });
  const filteredPromotionCmdrs = useCmdrSearch({
    searchValue,
    cmdrs: promoCmdrs,
  });

  useEffect(() => {
    setPage(0);
  }, [filteredCmdrs.length]);

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof IMember) => {
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

  const processView = (view: MemberViews) => {
    let headCells: HeadCell<IMember>[];
    let data: (cmdr: IMember) => ViewData[];
    switch (view) {
      case MemberViews.Notes:
        headCells = memberNoteHeadCells;
        data = memberNoteData;
        break;
      case MemberViews.Reference:
        headCells = memberRefHeadCells;
        data = memberRefData;
        break;
      default:
        headCells = memberDefaultHeadCells;
        data = memberDefaultData;
        break;
    }
    switch (view) {
      case MemberViews.Deleted:
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
              headCells={memberDeletedHeadCells}
              data={memberDeletedData}
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
      case MemberViews.Promotions:
        return (
          <>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
              component="div"
              count={filteredPromotionCmdrs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <CmdrDefaultView
              cmdrs={filteredPromotionCmdrs}
              selected={selected}
              setSelected={setSelected}
              page={page}
              rowsPerPage={rowsPerPage}
              order={order}
              orderBy={orderBy}
              handleSelectAllClick={handleSelectAllClick}
              handleRequestSort={handleRequestSort}
              handleClick={handleClick}
              headCells={memberPromotionHeadCells}
              data={memberPromotionData}
            />
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
              component="div"
              count={filteredPromotionCmdrs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        );
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
        break;
    }
  };

  return (
    <>
      <DashboardToolbar
        title="Members"
        viewOptions={memberViews}
        view={memberView}
        setView={setMemberView}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Divider />
      {processView(memberView)}
    </>
  );
};
