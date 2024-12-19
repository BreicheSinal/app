import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

import Navbar from "../../components/NavBar";

interface FeedLayoutProps {
  children: ReactNode;
}

const FeedLayout: FC<FeedLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />

      <Box className="custom-card-container flex justify-center full-width">
        {children}
      </Box>
    </Box>
  );
};

export default FeedLayout;
