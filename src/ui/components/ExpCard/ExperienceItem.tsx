import { FC } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { Experience } from "../../../core/utils/globalUtils";

interface ExperienceItemProps {
  experience: Experience;
  showEdit?: boolean;
  onEdit?: (experience: Experience) => void;
  onDelete?: (id: number) => void;
  isLast?: boolean;
}

export const ExperienceItem: FC<ExperienceItemProps> = ({
  experience,
  showEdit,
  onEdit,
  onDelete,
  isLast,
}) => (
  <>
    <Box
      className="Card secondary-bg-color"
      sx={{
        backgroundColor: "#1d2125",
        color: "white",
        border: "none",
        borderRadius: 2,
        padding: 2,
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
            {experience.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "white", opacity: 0.7 }}>
            {experience.date}
          </Typography>
        </Box>
        {showEdit && (
          <Box>
            <IconButton
              size="small"
              onClick={() => onEdit?.(experience)}
              sx={{ color: "primary.main", marginRight: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete?.(experience.id)}
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
        {experience.description}
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
