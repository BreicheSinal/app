import { FC } from "react";
import { Typography, Skeleton } from "@mui/material";

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
    <Typography
      variant="body2"
      sx={{ lineHeight: 1.6, opacity: 0.9, color:"#ffff"}}
    >
      {bioText || "No bio available."}
    </Typography>
  );
};

export default BioContent;
