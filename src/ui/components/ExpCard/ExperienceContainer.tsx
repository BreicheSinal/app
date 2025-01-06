import { FC } from "react";
import { Box } from "@mui/material";

interface ExperienceContainerProps {
  width?: number;
  children: React.ReactNode;
}

export const ExperienceContainer: FC<ExperienceContainerProps> = ({
  width = 600,
  children,
}) => (
  <Box className="Box flex align-start">
    <Box
      className="Card secondary-bg-color"
      sx={{
        width: { xs: "90%", sm: width, md: width },
        minWidth: "300px",
        maxWidth: "600px",
        height: "auto",
        borderRadius: 2,
        padding: 2,
      }}
    >
      {children}
    </Box>
  </Box>
);
