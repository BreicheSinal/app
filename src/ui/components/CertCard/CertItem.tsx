import { FC } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { Certificate } from "../../../core/utils/globalUtils";

interface CertificateItemProps {
  certificate: Certificate;
  showEdit?: boolean;
  onEdit?: (experience: Certificate) => void;
  onDelete?: (id: number) => void;
  isLast?: boolean;
}

export const CertificateItem: FC<CertificateItemProps> = ({
  certificate,
  showEdit,
  onEdit,
  onDelete,
  isLast,
}) => (
  <>
    <Box
      className="secondary-bg-color"
      sx={{
        backgroundColor: "#1d2125",
        color: "white",
        border: "none",
        borderRadius: 2,
        pl: 2,
        pr: 2.5,
        pb: 2,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            {certificate.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "white", opacity: 0.7 }}>
            {certificate.date}
          </Typography>
        </Box>
        {showEdit && (
          <Box>
            <IconButton
              size="small"
              onClick={() => onEdit?.(certificate)}
              sx={{ color: "primary.main", marginRight: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete?.(certificate.id)}
              sx={{ color: "#ff1744" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "white", opacity: 0.9, mt: 1, lineHeight: 1.6 }}
      >
        {certificate.description}
      </Typography>
    </Box>
    {!isLast && (
      <Divider
        sx={{
          backgroundColor: "white",
          opacity: 0.5,
          mb: 2,
        }}
      />
    )}
  </>
);
