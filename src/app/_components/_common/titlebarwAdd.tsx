import { Add } from '@mui/icons-material';
import { Toolbar, Typography, Tooltip, Button } from '@mui/material';

export const TitleBarwAdd = ({
  title,
  addTip,
  addItem,
}: {
  title: string;
  addTip: string;
  addItem: () => void;
}) => {
  return (
    <Toolbar sx={{ pl: 2, pr: 1, '& button': { m: 1 } }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ flex: '2 1 100%', textAlign: 'left' }}
      >
        {title}
      </Typography>
      <Tooltip title={addTip} arrow>
        <Button variant="outlined" color="primary" onClick={addItem}>
          <Add />
        </Button>
      </Tooltip>
    </Toolbar>
  );
};
