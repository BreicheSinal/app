import { FC } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface BioHeaderProps {
  showEdit?: boolean;
  onEditClick?: () => void;
  isLoading?: boolean;
}

const BioHeader: FC<BioHeaderProps> = ({
  showEdit,
  onEditClick,
  isLoading,
}) => {
  return (
    <Box
      className="flex space-between align-center"
      sx={{ position: "relative", mb: 1 }}
    >
      <Typography
        variant="h6"
        className="tertiary-color"
        sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
      >
        BIO
      </Typography>
      {showEdit && !isLoading && (
        <IconButton
          onClick={onEditClick}
          size="small"
          sx={{
            color: "primary.main",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default BioHeader;
