import { Box, Button } from "@mui/material";
import { FC } from "react";

interface ButtonLinkProps {
  text: string;
}

const ButtonLink: FC<ButtonLinkProps> = ({ text }) => {
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
          {text}
        </Button>
      </Box>
    </>
  );
};

export default ButtonLink;
