import { FC } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface ExperienceHeaderProps {
  onAdd?: () => void;
  showEdit?: boolean;
}

export const ExperienceHeader: FC<ExperienceHeaderProps> = ({
  onAdd,
  showEdit,
}) => (
  <Box
    className="flex space-between align-center"
    sx={{ position: "relative", mb: 1, pl: 1.5, pt: 1.5 }}
  >
    <Typography
      variant="h6"
      className="tertiary-color"
      sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
    >
      EXPERIENCE
    </Typography>
    {showEdit && onAdd && (
      <IconButton
        color="primary"
        onClick={onAdd}
        sx={{
          color: "primary.main",
          position: "absolute",
          right: 0,
          pr: 3,
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    )}
  </Box>
);
