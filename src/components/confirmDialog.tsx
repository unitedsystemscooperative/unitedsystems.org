import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { ReactNode } from 'react';

interface ConfirmDialogProps {
  title?: string;
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
  onConfirm: () => void;
}
export const ConfirmDialog = ({
  title,
  children,
  open,
  onClose,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="secondary">
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onConfirm();
          }}
          color="primary"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
