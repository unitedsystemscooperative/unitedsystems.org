import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Clear, Search } from '@material-ui/icons';
import React, { Dispatch, MouseEvent, SetStateAction } from 'react';

const useTitleBarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    '& button': {
      margin: theme.spacing(1),
    },
  },
  title: {
    flex: '2 1 100%',
    textAlign: 'left',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  searchBar: {
    display: 'flex',
    minWidth: 250,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing(1),
  },
  iconButton: {
    padding: 10,
  },
}));

interface ToolbarProps {
  title: string;
  viewOptions: string[];
  view: string;
  setView: Dispatch<SetStateAction<string>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const DashboardToolbar = (props: ToolbarProps) => {
  const classes = useTitleBarStyles();
  const {
    title,
    viewOptions,
    view,
    setView,
    searchValue,
    setSearchValue,
  } = props;

  const handleViewMenuClick = (_: MouseEvent<HTMLElement>, option: string) => {
    setView(option);
  };

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h4" component="div" className={classes.title}>
        {title}
      </Typography>
      <Paper className={classes.searchBar} variant="outlined">
        <div className={classes.iconButton}>
          <Search />
        </div>
        <InputBase
          className={classes.searchInput}
          placeholder="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <IconButton
          className={classes.iconButton}
          onClick={() => setSearchValue('')}
        >
          <Clear />
        </IconButton>
      </Paper>
      <FormControl className={classes.formControl}>
        <InputLabel>{title} View</InputLabel>
        <Select
          label="View"
          fullWidth
          value={view}
          MenuProps={{
            anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            getContentAnchorEl: null,
          }}
        >
          {viewOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
              onClick={(event) => handleViewMenuClick(event, option)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Toolbar>
  );
};
