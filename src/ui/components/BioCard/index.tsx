import { useState, useEffect, FC } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface BioCardProps {
  width: number;
  bioText: string | null;
  showEdit: boolean;
  onEdit: (updatedBio: string) => Promise<void>;
  isLoading: boolean;
}

interface BioCardViewProps {
  width: number;
  bioText: string | null;
}

const BioCard: FC<BioCardProps> = ({
  width = 600,
  bioText = "",
  showEdit = false,
  onEdit,
  isLoading = false,
}) => {
  const [open, setOpen] = useState(false);
  const [editedBio, setEditedBio] = useState(bioText);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedBio(bioText);
  }, [bioText]);

  const handleEditClick = () => {
    setEditedBio(bioText);
    setOpen(true);
  };

  const handleClose = () => {
    setEditedBio(bioText);
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onEdit(editedBio || "");
      setOpen(false);
    } catch (error) {
      console.error("Error saving bio:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Box className="Box flex align-start">
        <Box
          className="Card secondary-bg-color"
          sx={{
            width: { xs: "90%", sm: width, md: width },
            minWidth: "300px",
            maxWidth: "600px",
            height: "auto",
            border: "none",
            borderRadius: 2,
            padding: 2,
          }}
        >
          <Box
            className="flex space-between align-center"
            sx={{ position: "relative", mb: 1 }}
          >
            <Typography
              variant="h6"
              className="tertiary-color"
              sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
            >
              BIO
            </Typography>
            {showEdit && !isLoading && (
              <IconButton
                onClick={handleEditClick}
                size="small"
                sx={{
                  color: "primary.main",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {isLoading ? (
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ bgcolor: "grey.800" }}
            />
          ) : (
            <Typography
              variant="body2"
              className="white-color"
              sx={{ lineHeight: 1.6, opacity: 0.9 }}
            >
              {bioText || "No bio available."}
            </Typography>
          )}
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
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
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={isSaving}>
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
    </>
  );
};

const BioCardView: FC<BioCardViewProps> = ({ width = 600, bioText = "" }) => {
  return (
    <Box className="Box flex align-start">
      <Box
        className="Card secondary-bg-color"
        sx={{
          width: { xs: "90%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "600px",
          height: "auto",
          border: "none",
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Box
          className="flex space-between align-center"
          sx={{ position: "relative", mb: 1 }}
        >
          <Typography
            variant="h6"
            className="tertiary-color"
            sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
          >
            BIO
          </Typography>
        </Box>

        <Typography
          variant="body2"
          className="white-color"
          sx={{ lineHeight: 1.6, opacity: 0.9 }}
        >
          {bioText || "No bio available."}
        </Typography>
      </Box>
    </Box>
  );
};
export { BioCard, BioCardView };
