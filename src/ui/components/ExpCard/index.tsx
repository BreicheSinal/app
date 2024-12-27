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
  addition: (experience: Omit<Experience, "id">) => void;
  edit: (experience: Experience) => void;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  width = 600,
  experiences,
  addition,
  edit,
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

  const close = () => {
    setOpen(false);
    setSelectedExperience(null);
    setFormData({
      name: "",
      year: "",
      description: "",
    });
  };

  const submit = () => {
    if (selectedExperience) {
      edit({
        ...selectedExperience,
        ...formData,
      });
    } else {
      addition(formData);
    }
    close();
  };

  const change =
    (field: keyof Omit<Experience, "id">) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
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

        <Dialog
          open={open}
          onClose={close}
          fullWidth
          maxWidth="sm"
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#1d2125",
              color: "white",
            },
          }}
        >
          <DialogTitle className="bold tertiary-color">
            {selectedExperience ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Name"
                fullWidth
                value={formData.name}
                onChange={change("name")}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
              <TextField
                label="Year"
                fullWidth
                value={formData.year}
                onChange={change("year")}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={change("description")}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              Cancel
            </Button>
            <Button onClick={submit} color="primary" variant="contained">
              {selectedExperience ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ExperienceCard;
