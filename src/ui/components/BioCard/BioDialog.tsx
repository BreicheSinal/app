import { useState, useEffect, FC } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

interface BioDialogProps {
  open: boolean;
  onClose: () => void;
  bioText: string | null;
  onSave: (bio: string) => Promise<void>;
  isSaving: boolean;
}

const BioDialog: FC<BioDialogProps> = ({
  open,
  onClose,
  bioText,
  onSave,
  isSaving,
}) => {
  const [editedBio, setEditedBio] = useState(bioText);

  useEffect(() => {
    setEditedBio(bioText);
  }, [bioText]);

  const handleSave = async () => {
    try {
      await onSave(editedBio || "");
      onClose();
    } catch (error) {
      console.error("Error saving bio:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#1d2125",
          color: "white",
        },
      }}
    >
      <DialogTitle className="bold tertiary-color">Edit BIO</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Bio"
          value={editedBio}
          onChange={(e) => setEditedBio(e.target.value)}
          multiline
          rows={4}
          disabled={isSaving}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "20px 24px" }}>
        <Button onClick={onClose} color="error" disabled={isSaving}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BioDialog;
