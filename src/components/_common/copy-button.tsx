import { copytoClipboard } from '@/functions/copytoClipboard';
import FileCopy from '@mui/icons-material/FileCopy';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';

interface ICopyButtonProps {
  value: string;
}
export const CopyButton = ({ value }: ICopyButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await copytoClipboard(text);
      enqueueSnackbar('Copied', { variant: 'success' });
    } catch {
      enqueueSnackbar('Failed to copy', { variant: 'error' });
    }
  };

  return (
    <IconButton size="small" color="secondary" onClick={() => copy(value)}>
      <FileCopy />
    </IconButton>
  );
};
