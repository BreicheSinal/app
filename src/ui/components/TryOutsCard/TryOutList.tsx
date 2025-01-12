import { FC } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Tryout {
  id: number;
  name: string;
  date: string;
  description: string;
  meetingUrl: string;
}

interface TryoutsListProps {
  tryouts: Tryout[];
  onDelete: (id: number) => void;
}

export const TryoutsList: FC<TryoutsListProps> = ({ tryouts, onDelete }) => {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            bgcolor: "rgba(255, 255, 255, 0.05)",
            transition: "background-color 0.2s ease-in-out",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          {tryouts.map((tryout) => (
            <Box
              key={tryout.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                bgcolor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 1,
                p: 1,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography sx={{ color: "white" }}>{tryout.name}</Typography>
                  <Typography sx={{ color: "white" }}>{tryout.date}</Typography>
                </Box>
                {tryout.description && (
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {tryout.description}
                  </Typography>
                )}
                <Box>
                  <Typography component="span" sx={{ color: "white" }}>
                    Link:{" "}
                  </Typography>
                  <Link
                    href={tryout.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "#9ac6ff",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {tryout.meetingUrl}
                  </Link>
                </Box>
              </Box>
              <IconButton
                onClick={() => onDelete(tryout.id)}
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
  );
};
