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
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#1D2125",
          "& .MuiDialogTitle-root": {
            color: "white",
            padding: "24px",
            paddingBottom: "16px",
          },
          "& .MuiDialogContent-root": {
            padding: "24px",
            paddingTop: 0,
            paddingBottom: "16px",
          },
          "& .MuiDialogContentText-root": {
            color: "rgba(255, 255, 255, 0.7)",
          },
          "& .MuiDialogActions-root": {
            padding: "24px",
            paddingTop: "8px",
          },
        },
      }}
    >
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
};
