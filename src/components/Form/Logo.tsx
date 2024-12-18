import { Box } from "@mui/material";
import { FC } from "react";

const Logo: FC = () => {
  return (
    <>
      <Box
        className="flex justify-center align-center"
        sx={{
          mb: 1,
        }}
      >
        <img src="./src/assets/icons/AthLink_noBG.png" alt="Logo" width={100} />
      </Box>
    </>
  );
};

export default Logo;
