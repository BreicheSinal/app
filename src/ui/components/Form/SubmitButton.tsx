import { Box, Button } from "@mui/material";
import { FC } from "react";

const SubmitButton: FC = () => {
  return (
    <>
      <Box className="flex justify-center" sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#2684FF" }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default SubmitButton;
