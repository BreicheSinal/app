import { useState, useEffect, FC } from "react";
import { Box, Typography } from "@mui/material";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

const InitialLoader: FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "unset";
    }, 1250);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!show) return null;

  const icons = [
    SportsBasketballIcon,
    SportsSoccerIcon,
    SportsVolleyballIcon,
    SportsBaseballIcon,
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#1D2125",
        zIndex: 9999,
        opacity: show ? 1 : 0,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          mb: 2,
        }}
      >
        {icons.map((Icon, index) => (
          <Icon
            key={index}
            sx={{
              fontSize: 32,
              color: "#1976d2",
              animation: "bounce-rotate 1s ease-in-out infinite",
              animationDelay: `${index * 0.15}s`,
              "@keyframes bounce-rotate": {
                "0%, 100%": {
                  transform: "translateY(0) rotate(0deg)",
                  opacity: 0.5,
                },
                "50%": {
                  transform: "translateY(-15px) rotate(180deg)",
                  opacity: 1,
                },
              },
            }}
          />
        ))}
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: "#1976d2",
          fontWeight: 600,
          opacity: 0.9,
          animation: "pulse 1.5s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": {
              opacity: 0.5,
            },
            "50%": {
              opacity: 1,
            },
          },
        }}
      >
        ATHLINK
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "#1976d2",
          opacity: 0.7,
          mt: 1,
          letterSpacing: 1,
        }}
      >
        Connecting Athletes Worldwide
      </Typography>
    </Box>
  );
};

export default InitialLoader;
