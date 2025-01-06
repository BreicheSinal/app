import { FC, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddTryoutFormProps {
  onAdd: (tryout: { name: string; date: string; description: string }) => void;
}

export const AddTryoutForm: FC<AddTryoutFormProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (name && date) {
      onAdd({ name, date, description });
      setName("");
      setDate("");
      setDescription("");
    }
  };

  return (
    <Card
      className="secondary-bg-color"
      sx={{
        width: { xs: "90%", sm: "500px", md: "632px" },
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                }}
              />
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                mb: 0.5,
                fontSize: "0.875rem",
              }}
            >
              Description
            </Typography>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description"
              size="small"
              multiline
              rows={2}
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
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              disableRipple
              onClick={handleSubmit}
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
  );
};
