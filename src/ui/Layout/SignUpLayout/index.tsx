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

      <Grid className="img-container" item xs={false} sm={6} md={6} />
    </Grid>
  );
};

export default SignUpLayout;
