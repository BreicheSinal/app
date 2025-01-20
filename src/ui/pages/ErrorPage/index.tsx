import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1D2125",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            padding: 4,
            textAlign: "center",
            borderRadius: 4,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "8rem",
              fontWeight: 700,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              mb: 3,
              fontWeight: 300,
            }}
          >
            Oops! Page not found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mb: 4,
            }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>

          <Button
            disableRipple
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/profile")}
            sx={{
              backgroundColor: "#2196F3",
              "&:hover": {
                backgroundColor: "#1976D2",
              },
              py: 1.5,
              px: 4,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ErrorPage;
