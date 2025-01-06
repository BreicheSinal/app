import { FC, ChangeEvent } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";

import { ExperienceFormData } from "../../../core/utils/globalUtils";
import { textFieldStyles } from "../../styles/textFieldStyles";

interface ExperienceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: ExperienceFormData;
  onChange: (
    field: keyof ExperienceFormData
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isEdit: boolean;
}

export const ExperienceDialog: FC<ExperienceDialogProps> = ({
  open,
  onClose,
  onSubmit,
  formData,
  onChange,
  isEdit,
}) => (
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
    <DialogTitle className="bold tertiary-color">
      {isEdit ? "Edit Experience" : "Add Experience"}
    </DialogTitle>
    <DialogContent>
      <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          fullWidth
          value={formData.name}
          onChange={onChange("name")}
          sx={textFieldStyles}
        />
        <TextField
          label="Year"
          fullWidth
          value={formData.date}
          onChange={onChange("date")}
          sx={textFieldStyles}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={formData.description}
          onChange={onChange("description")}
          sx={textFieldStyles}
        />
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onSubmit} color="primary" variant="contained">
        {isEdit ? "Update" : "Add"}
      </Button>
    </DialogActions>
  </Dialog>
);
