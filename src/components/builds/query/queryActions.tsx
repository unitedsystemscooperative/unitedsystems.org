import { Box, Button } from '@mui/material';

export interface QueryActionsProps {
  resetQueries: () => void;
  addBuild: () => void;
}

export const QueryActions = ({ resetQueries, addBuild }: QueryActionsProps) => {
  const handleAdd = () => {
    console.log('QueryActions: Add build clicked');
    addBuild();
  };
  return (
    <Box
      sx={{ textAlign: 'center', gridArea: 'buttons', '& button': { m: 1 } }}
    >
      <Button
        onClick={resetQueries}
        color="primary"
        variant="outlined"
        className="resetButton"
      >
        Reset Selections
      </Button>
      <Button onClick={handleAdd} variant="outlined" color="secondary">
        Add Build
      </Button>
    </Box>
  );
};
