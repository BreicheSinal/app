import { FC } from "react";
import { Grid, Box, Typography } from "@mui/material";
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
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Box sx={{ mb: 1 }}>
            <img
              src="./src/assets/icons/AthLink_noBG.png"
              alt="Logo"
              width={100}
            />
          </Box>

          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: 2,
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            SIGN UP
          </Typography>
        </Box>
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

export default SignUp;
