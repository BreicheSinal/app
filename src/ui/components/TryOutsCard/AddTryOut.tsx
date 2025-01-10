import { FC, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

interface AddTryoutFormProps {
  onAdd: (tryout: {
    name: string;
    date: string;
    description: string;
  }) => void;
  isLoading: boolean;
}

export const AddTryoutForm: FC<AddTryoutFormProps> = ({ onAdd, isLoading }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (name && date && !isLoading) {
      onAdd({
        name,
        date: date.format("YYYY/MM/DD hh:mm:ss A"),
        description,
      });
      setName("");
      setDate(dayjs());
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
                disabled={isLoading}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={date}
                  onChange={(newValue) => setDate(newValue || dayjs())}
                  views={[
                    "year",
                    "month",
                    "day",
                    "hours",
                    "minutes",
                    "seconds",
                  ]}
                  disabled={isLoading}
                  sx={{
                    width: "220px",
                    "& .MuiInputBase-input": {
                      color: "white",
                      padding: "11px 14px",
                      fontSize: "0.8rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(255, 255, 255, 0.23)",
                      },
                    },
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          backgroundColor: "#1a1a1a",
                          color: "white",
                        },
                        "& .MuiPickersDay-root": {
                          color: "white",
                          fontSize: "0.875rem",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#1976d2",
                          },
                        },
                        "& .MuiDayCalendar-weekDayLabel": {
                          color: "white",
                        },
                        "& .MuiIconButton-root": {
                          color: "white",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
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
              disabled={isLoading}
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
              disabled={isLoading || !name || !date}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                "&.Mui-disabled": {
                  bgcolor: "#d3d3d3 !important",
                  color: "#808080 !important",
                },
                padding: "8px",
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <AddIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
