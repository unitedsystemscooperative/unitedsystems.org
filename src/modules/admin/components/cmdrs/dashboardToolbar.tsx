import { Clear, Search } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Toolbar,
  Typography,
} from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

interface ToolbarProps {
  title: string;
  viewOptions: string[];
  view: string;
  setView: Dispatch<SetStateAction<string>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const DashboardToolbar = (props: ToolbarProps) => {
  const { title, viewOptions, view, setView, searchValue, setSearchValue } = props;

  const handleViewMenuClick = (_: MouseEvent<HTMLElement>, option: string) => {
    setView(option);
  };

  return (
    <Toolbar
      sx={{
        pl: 2,
        pr: 1,
        '& button': {
          m: 1,
        },
      }}>
      <Typography variant="h4" component="div" sx={{ flex: '2 1 100%', textAlign: 'left' }}>
        {title}
      </Typography>
      <Paper
        sx={{
          display: 'flex',
          minWidth: 250,
          alignItems: 'center',
        }}
        variant="outlined">
        <IconButton disabled>
          <Search />
        </IconButton>
        <InputBase
          sx={{ flex: 1, ml: 1 }}
          placeholder="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <IconButton sx={{ pl: 2 }} onClick={() => setSearchValue('')} size="large">
          <Clear />
        </IconButton>
      </Paper>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
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
          }}>
          {viewOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
              onClick={(event) => handleViewMenuClick(event, option)}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Toolbar>
  );
};
