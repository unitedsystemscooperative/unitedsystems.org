import { Divider, TablePagination } from '@material-ui/core';
import { IMember } from 'models/admin/cmdr';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { MemberDefaultView } from './views/memberDefaultView';

type Order = 'asc' | 'desc';

interface MemberDashboardProps {
  cmdrs: IMember[];
  deletedCmdrs: IMember[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}

export const MemberDashboard = (props: MemberDashboardProps) => {
  const { cmdrs, selected, setSelected } = props;

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

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
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
      <MemberDefaultView
        cmdrs={cmdrs}
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
        count={cmdrs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};
