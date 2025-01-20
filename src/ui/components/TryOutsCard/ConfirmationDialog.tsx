import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

import { dialogStyles } from "../../styles/dialogStyles";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading,
}) => (
  <Dialog open={open} onClose={onClose} sx={dialogStyles}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        color="primary"
        disabled={isLoading}
        disableRipple
      >
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        color="error"
        disabled={isLoading}
        autoFocus
        disableRipple
        startIcon={
          isLoading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);
