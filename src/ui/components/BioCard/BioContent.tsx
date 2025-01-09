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
    <Box className="flex space-between align-center" sx={{ mb: 1.5, pl: 1.5 }}>
      <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#ffff" }}>
        {bioText || "No bio available."}
      </Typography>
    </Box>
  );
};

export default BioContent;
