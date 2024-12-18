import { Grid, Box } from "@mui/material";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const SignUpLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", backgroundColor: "#1d2125" }}
    >
      <Grid
        className="flex justify-center align-center"
        item
        xs={12}
        sm={6}
        md={6}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>{children}</Box>
      </Grid>

      <Grid
        item
        xs={false}
        sm={6}
        md={6}
        sx={{
          backgroundImage: "url('src/assets/images/sports.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default SignUpLayout;
