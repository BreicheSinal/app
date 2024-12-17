import { FC } from "react";
import { Grid, Box } from "@mui/material";
import "./style.css";

const SignUp: FC = () => {
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", backgroundColor: "#1d2125" }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Grid>

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

export default SignUp;
