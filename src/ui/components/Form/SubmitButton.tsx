import { Box, Button } from "@mui/material";
import { FC } from "react";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ text }) => {
  return (
    <>
      <Box className="flex justify-center" sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#2684FF", textTransform: "none" }}
        >
          {text}
        </Button>
      </Box>
    </>
  );
};

export default SubmitButton;
