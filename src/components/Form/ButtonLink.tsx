import { Box, Button } from "@mui/material";
import { FC } from "react";

const ButtonLink: FC = () => {
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="text"
          disableRipple
          sx={{
            color: "#ffffff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Already have an account? Log in
        </Button>
      </Box>
    </>
  );
};

export default ButtonLink;
