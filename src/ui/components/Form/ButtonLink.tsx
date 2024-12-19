import { Box, Button } from "@mui/material";
import { FC } from "react";

interface ButtonLinkProps {
  text: string;
  onClick: () => void;
}

const ButtonLink: FC<ButtonLinkProps> = ({ text, onClick }) => {
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="text"
          disableRipple
          onClick={onClick}
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
