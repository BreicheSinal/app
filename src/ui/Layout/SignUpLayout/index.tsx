import { Grid, Box } from "@mui/material";
import React from "react";

import "./style.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const SignUpLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Grid container component="main" className="container">
      <Grid
        className="flex justify-center align-center"
        item
        xs={12}
        sm={6}
        md={6}
      >
        <Box className="form-container">{children}</Box>
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
