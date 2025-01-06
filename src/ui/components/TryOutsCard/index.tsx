import { useState, FC } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface Tryout {
  id: number;
  name: string;
  date: string;
}

const TryoutsManager: FC = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tryouts, setTryouts] = useState<Tryout[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const addTr = () => {
    if (name && date) {
      setTryouts([
        ...tryouts,
        {
          id: Date.now(),
          name,
          date,
        },
      ]);
      setName("");
      setDate("");
    }
  };

  const deleteTr = (id: number) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    setTryouts(tryouts.filter((tryout) => tryout.id !== deleteId));
    setOpenDialog(false);
    setDeleteId(null);
  };

  const cardWidth = { xs: "90%", sm: "500px", md: "632px" };

  return (
    <Box className="flex column" sx={{ padding: "10px" }}>
      {/* Add Try-out Card */}
      <Card
        className="secondary-bg-color"
        sx={{
          width: cardWidth,
          minWidth: "300px",
          maxWidth: "632px",
          height: "auto",
          border: "none",
          borderRadius: 2,
          mb: 2,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box className="flex space-between align-center" sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              className="tertiary-color"
              sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
            >
              ADD TRY-OUT
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 0.5,
                  fontSize: "0.875rem",
                }}
              >
                Try-Out Name
              </Typography>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                size="small"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 0.5,
                  fontSize: "0.875rem",
                }}
              >
                Start Date
              </Typography>
              <TextField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    "&::-webkit-calendar-picker-indicator": {
                      filter: "invert(1)",
                    },
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <IconButton
                disableRipple
                onClick={addTr}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  padding: "8px",
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Try-outs List Card */}
      <Card
        className="secondary-bg-color"
        sx={{
          width: cardWidth,
          minWidth: "300px",
          maxWidth: "632px",
          height: "auto",
          border: "none",
          borderRadius: 2,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box className="flex space-between align-center" sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              className="tertiary-color"
              sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
            >
              TRY-OUTS
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {tryouts.map((tryout) => (
              <Box
                key={tryout.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography sx={{ color: "white" }}>{tryout.name}</Typography>
                  <Typography sx={{ color: "white" }}>{tryout.date}</Typography>
                </Box>
                <IconButton
                  onClick={() => deleteTr(tryout.id)}
                  size="small"
                  sx={{ color: "error.main" }}
                  disableRipple
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Deletion Popup Confirmation */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
            onClick={() => setOpenDialog(false)}
            color="primary"
            disableRipple
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus disableRipple>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TryoutsManager;
