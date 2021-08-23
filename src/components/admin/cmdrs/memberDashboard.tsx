import { Divider, TablePagination } from '@material-ui/core';
import { Order } from 'functions/sort';
import { useCmdrSearch } from 'hooks/useCmdrSearch';
import { IMember } from 'models/admin/cmdr';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { DashboardToolbar } from './dashboardToolbar';
import { CmdrDefaultView } from './views/commonView';
import {
  MemberDefaultHeadCells,
  MemberDefaultRow,
} from './views/memberDefaultView';
import { MemberDeletedView } from './views/memberDeletedView';
import { MemberNoteView } from './views/memberNoteView';
import { MemberPromotionView } from './views/memberPromotionView';
import { MemberRefView } from './views/memberRefView';

const memberViews = ['Default', 'Notes', 'Reference', 'Promotions', 'Deleted'];

interface MemberDashboardProps {
  cmdrs: IMember[];
  deletedCmdrs: IMember[];
  promoCmdrs: IMember[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  restoreCMDR: (cmdr: IMember) => Promise<void>;
}

export const MemberDashboard = (props: MemberDashboardProps) => {
  const {
    cmdrs,
    selected,
    setSelected,
    deletedCmdrs,
    promoCmdrs,
    restoreCMDR,
  } = props;

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IMember>('cmdrName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [memberView, setMemberView] = useState(0);
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

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof IMember
  ) => {
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

  if (memberView === 3) {
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
          component="div"
          count={filteredPromotionCmdrs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <MemberPromotionView
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
  }
  if (memberView === 4) {
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
          component="div"
          count={filteredDeletedCmdrs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <MemberDeletedView
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
          handleRestore={restoreCMDR}
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
  }

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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, { value: -1, label: 'All' }]}
        component="div"
        count={filteredCmdrs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {memberView === 0 && (
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
          headCells={MemberDefaultHeadCells}
          row={MemberDefaultRow}
        />
      )}
      {memberView === 1 && (
        <MemberNoteView
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
        />
      )}
      {memberView === 2 && (
        <MemberRefView
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
        />
      )}
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
};
