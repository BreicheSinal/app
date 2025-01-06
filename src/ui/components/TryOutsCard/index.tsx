import { useState, FC } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

const TryoutsManager: FC = () => {
  const [name, setName] = useState("");

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
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TryoutsManager;
