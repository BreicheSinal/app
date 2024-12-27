import { FC, useState, Fragment } from "react";
import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";

// Types
interface Experience {
  id?: string;
  name: string;
  year: string;
  description: string;
}

interface ExperienceCardProps {
  width?: 600;
  experiences: Experience[];
  onAddExperience: (experience: Omit<Experience, "id">) => void;
  onUpdateExperience: (experience: Experience) => void;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  width = 600,
  experiences,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    name: "",
    year: "",
    description: "",
  });

  const handleOpen = (experience?: Experience) => {
    if (experience) {
      setSelectedExperience(experience);
      setFormData({
        name: experience.name,
        year: experience.year,
        description: experience.description,
      });
    } else {
      setSelectedExperience(null);
      setFormData({
        name: "",
        year: "",
        description: "",
      });
    }
    setOpen(true);
  };

  return (
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
        <Box
          className="flex space-between align-center"
          sx={{ position: "relative", mb: 1 }}
        >
          <Typography
            variant="h6"
            className="tertiary-color"
            sx={{ fontWeight: "bold", letterSpacing: "0.5px" }}
          >
            EXPERIENCE
          </Typography>
          <IconButton
            color="primary"
            onClick={() => handleOpen()}
            sx={{
              color: "primary.main",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        {experiences.map((experience, index) => (
          <Fragment key={index}>
            <Box
              className="Card secondary-bg-color"
              sx={{
                backgroundColor: "#1d2125",
                color: "white",
                border: "none",
                borderRadius: 2,
                padding: 2,
                mb: 2,
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
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "white", opacity: 0.7 }}
                  >
                    {experience.year}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => handleOpen(experience)}
                  sx={{
                    color: "primary.main",
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "white", opacity: 0.9, mt: 1, lineHeight: 1.6 }}
              >
                {experience.description}
              </Typography>
            </Box>
            {index < experiences.length - 1 && (
              <Divider
                sx={{
                  backgroundColor: "white",
                  opacity: 0.5,
                  mb: 2,
                }}
              />
            )}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default ExperienceCard;
