import { Box } from '@mui/material';
import { PaperOutlineButton } from 'components/_common/button';

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
      <PaperOutlineButton
        onClick={resetQueries}
        color="primary"
        variant="outlined"
        className="resetButton"
      >
        Reset Selections
      </PaperOutlineButton>
      <PaperOutlineButton
        onClick={handleAdd}
        variant="outlined"
        color="secondary"
      >
        Add Build
      </PaperOutlineButton>
    </Box>
  );
};
