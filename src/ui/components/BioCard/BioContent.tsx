import { FC } from "react";
import { Typography, Skeleton, Box } from "@mui/material";

interface BioContentProps {
  bioText: string | null;
  isLoading?: boolean;
}

const BioContent: FC<BioContentProps> = ({ bioText, isLoading }) => {
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        height={100}
        sx={{ bgcolor: "grey.800" }}
      />
    );
  }

  return (
    <Box className="flex space-between align-center">
      <Typography
        variant="body2"
        sx={{ lineHeight: 1.6, color: "#ffff", mt: 1 }}
      >
        {bioText || "No bio available."}
      </Typography>
    </Box>
  );
};

export default BioContent;
