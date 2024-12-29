import { FC, useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PendingIcon from "@mui/icons-material/PendingOutlined"; // For "Pending" icon
import CheckIcon from "@mui/icons-material/CheckCircleOutline";

import "./style.css";

import { createConnectionRequest } from "../../../core/utils/addDetails";

interface Club {
  id: number;
  name: string;
}

interface ProfileField {
  label: string;
  value: string | number | null;
  displayValue?: string;
  type?: "text" | "select" | string;
  options?: Club[];
}

interface ProfileData {
  title: string;
  avatar?: string;
  headerColor?: string;
  fields: ProfileField[];
}

interface ProfileCardProps {
  width: number;
  data: ProfileData;
  showEdit?: boolean;
  showConnect?: boolean;
  onEdit?: (updatedFields: {
    [key: string]: string | number | null;
  }) => Promise<void>;
  isLoading?: boolean;
  clubs?: Club[];
  connectedUserId?: number;
  userId?: number;
  connectionStatus?: string;
}

const ProfileCard: FC<ProfileCardProps> = ({
  width,
  data,
  showEdit = false,
  onEdit,
  isLoading = false,
  clubs = [],
}) => {
  const [open, setOpen] = useState(false);

  const [editedFields, setEditedFields] = useState<{
    [key: string]: string | number | null;
  }>({});

  const [isSaving, setIsSaving] = useState(false);

  const editClick = () => {
    const initialFields = data.fields.reduce((acc, field) => {
      acc[field.label] = field.value;
      return acc;
    }, {} as { [key: string]: string | number | null });

    setEditedFields(initialFields);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setIsSaving(false);
  };

  const fieldChange = (label: string, value: string | number | null) => {
    setEditedFields((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const save = async () => {
    if (onEdit) {
      try {
        setIsSaving(true);
        await onEdit(editedFields);
        setOpen(false);
      } catch (error) {
        console.error("Error saving profile:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <>
      <Box className="Box flex align-start">
        <Card
          className="secondary-bg-color"
          sx={{
            width: { xs: "90%", sm: width, md: width },
            minWidth: "300px",
            maxWidth: "600px",
            height: "auto",
          }}
        >
          <Box className="banner full-width relative-position primary-bg-color">
            <Avatar
              className="absolute-position"
              sx={{
                width: 100,
                height: 100,
                top: "100%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {data.avatar}
            </Avatar>
          </Box>

          <CardContent sx={{ pt: 6 }}>
            <Box sx={{ position: "relative", textAlign: "center", mb: 2 }}>
              {showEdit && !isLoading && (
                <IconButton
                  onClick={editClick}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                  }}
                >
                  <EditIcon className="primary-color" fontSize="small" />
                </IconButton>
              )}
              <Typography variant="h5" className="white-color bold">
                {data.title}
              </Typography>
            </Box>

            {data.fields.map((field, index) => (
              <Box key={field.label}>
                <Box className="flex space-between align-center" sx={{ mb: 1 }}>
                  <Box>
                    <Typography variant="subtitle2" className="tertiary-color">
                      {field.label}
                    </Typography>
                    <Typography variant="body2" className="white-color">
                      {field.type === "select"
                        ? field.options?.find(
                            (opt) => opt.id === Number(field.value)
                          )?.name ||
                          field.displayValue ||
                          "N/A"
                        : field.value}
                    </Typography>
                  </Box>
                </Box>
                {index < data.fields.length - 1 && (
                  <Divider
                    sx={{ backgroundColor: "white", opacity: 0.5, mb: 1 }}
                  />
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>

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
        <DialogTitle className="bold tertiary-color">Edit Profile</DialogTitle>
        <DialogContent>
          {data.fields.map((field) =>
            field.type === "select" ? (
              <Autocomplete
                key={field.label}
                options={field.options || clubs}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                value={
                  field.options?.find(
                    (opt) => opt.id === Number(editedFields[field.label])
                  ) || null
                }
                onChange={(_, newValue) => {
                  fieldChange(field.label, newValue ? newValue.id : null);
                }}
                disabled={isSaving}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={field.label}
                    fullWidth
                    margin="dense"
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
                )}
                sx={{
                  "& .MuiAutocomplete-popupIndicator": {
                    color: "white",
                  },
                  "& .MuiAutocomplete-clearIndicator": {
                    color: "white",
                  },
                }}
                ListboxProps={{
                  style: {
                    backgroundColor: "white",
                    color: "#1d2125",
                  },
                }}
              />
            ) : (
              <TextField
                key={field.label}
                fullWidth
                margin="dense"
                label={field.label}
                value={editedFields[field.label] || ""}
                onChange={(e) => fieldChange(field.label, e.target.value)}
                disabled={isSaving}
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
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={save}
            color="primary"
            variant="contained"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ProfileCardView: FC<ProfileCardProps> = ({
  width,
  data,
  showConnect = false,
  connectedUserId,
  userId,
  connectionStatus,
}) => {
  const connect = () => {
    createConnectionRequest(userId!, connectedUserId!);
  };

  const renderConnectButton = () => {
    switch (connectionStatus) {
      case "accepted":
        return (
          <Button
            disabled
            variant="contained"
            startIcon={<CheckIcon />}
            sx={{
              mt: 2,
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              backgroundColor: "#43a047",
              "&:disabled": {
                backgroundColor: "#43a047",
                color: "white",
              },
            }}
          >
            Connected
          </Button>
        );
      case "pending":
        return (
          <Button
            disabled
            variant="contained"
            startIcon={<PendingIcon />}
            sx={{
              mt: 2,
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              backgroundColor: "#666",
              "&:disabled": {
                backgroundColor: "#666",
                color: "white",
              },
            }}
          >
            Pending
          </Button>
        );
      default:
        return (
          <Button
            onClick={connect}
            disableRipple
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              mt: 2,
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Connect
          </Button>
        );
    }
  };

  return (
    <Box className="Box flex align-start">
      <Card
        className="secondary-bg-color"
        sx={{
          width: { xs: "90%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "600px",
          height: "auto",
        }}
      >
        <Box className="banner full-width relative-position primary-bg-color">
          <Avatar
            className="absolute-position"
            sx={{
              width: 100,
              height: 100,
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {data.avatar}
          </Avatar>
        </Box>

        <CardContent sx={{ pt: 6 }}>
          <Box sx={{ position: "relative", textAlign: "center", mb: 2 }}>
            <Typography variant="h5" className="white-color bold">
              {data.title}
            </Typography>
            {showConnect && renderConnectButton()}
          </Box>

          {data.fields.map((field, index) => (
            <Box key={field.label}>
              <Box className="flex space-between align-center" sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="subtitle2" className="tertiary-color">
                    {field.label}
                  </Typography>
                  <Typography variant="body2" className="white-color">
                    {field.type === "select"
                      ? field.options?.find(
                          (opt) => opt.id === Number(field.value)
                        )?.name ||
                        field.displayValue ||
                        "N/A"
                      : field.value}
                  </Typography>
                </Box>
              </Box>
              {index < data.fields.length - 1 && (
                <Divider
                  sx={{ backgroundColor: "white", opacity: 0.5, mb: 1 }}
                />
              )}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export { ProfileCard, ProfileCardView };
