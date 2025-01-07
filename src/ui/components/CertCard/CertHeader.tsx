import { FC } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface CertificateHeaderProps {
  onAdd?: () => void;
  showEdit?: boolean;
}

export const CertificateHeader: FC<CertificateHeaderProps> = ({
  onAdd,
  showEdit,
}) => (
  <Box
    className="flex space-between align-center"
    sx={{ position: "relative" }}
  >
    <Typography
      variant="h6"
      className="tertiary-color"
      sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
    >
      CERTIFICATIONS
    </Typography>
    {showEdit && onAdd && (
      <IconButton
        color="primary"
        onClick={onAdd}
        sx={{
          color: "primary.main",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    )}
  </Box>
);
