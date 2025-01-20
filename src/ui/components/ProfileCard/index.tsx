import { FC, useState, useEffect, useMemo, useCallback } from "react";
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
import CheckIcon from "@mui/icons-material/CheckCircleOutline";
import PendingIcon from "@mui/icons-material/PendingOutlined";
import { getStoredRole, ClubOption } from "../../../core/utils/globalUtils";
import {
  fetchClubOptions,
  fetchFederationOptions,
} from "../../../core/utils/fetchDetails";

import { BadgeCheck } from "lucide-react";

import "./style.css";

interface ProfileField {
  label: string;
  value: string | number | null;
  displayValue?: string;
  type?: "text" | "select" | string;
  options?: ClubOption[];
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
  connectedUserId?: number;
  userId?: number;
  connectionStatus?: string;
  onConnect?: () => Promise<void>;
  role?: string;
}

const ProfileCard: FC<ProfileCardProps> = ({
  width,
  data,
  showEdit = false,
  onEdit,
  isLoading = false,
}) => {
  const role = useMemo(() => getStoredRole(), []);
  const [clubs, setClubs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedFields, setEditedFields] = useState<{
    [key: string]: string | number | null;
  }>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const fetchOptions = useCallback(async () => {
    if (!role || isLoadingOptions) return;

    setIsLoadingOptions(true);
    try {
      const options =
        role === "Club"
          ? await fetchFederationOptions()
          : role === "Athlete"
          ? await fetchClubOptions()
          : role === "Coach"
          ? await fetchClubOptions()
          : [];
      setClubs(options);
    } catch (error) {
      console.error("Error loading options:", error);
    } finally {
      setIsLoadingOptions(false);
    }
  }, [role, isLoadingOptions]);

  useEffect(() => {
    if (
      (role === "Athlete" || role === "Club" || role === "Coach") &&
      clubs.length === 0
    ) {
      fetchOptions();
    }
  }, [role, clubs.length, fetchOptions]);

  const initialFields = useMemo(() => {
    if (!data?.fields) return {};
    return data.fields.reduce((acc, field) => {
      acc[field.label] = field.value;
      return acc;
    }, {} as { [key: string]: string | number | null });
  }, [data?.fields]);

  useEffect(() => {
    setEditedFields(initialFields);
  }, [initialFields]);

  const editClick = useCallback(() => {
    setEditedFields(initialFields);
    setOpen(true);
  }, [initialFields]);

  const close = useCallback(() => {
    setOpen(false);
    setIsSaving(false);
  }, []);

  const fieldChange = useCallback(
    (label: string, value: string | number | null) => {
      setEditedFields((prev) => ({
        ...prev,
        [label]: value,
      }));
    },
    []
  );

  const save = useCallback(async () => {
    if (!onEdit) return;

    try {
      setIsSaving(true);
      await onEdit(editedFields);
      setOpen(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  }, [onEdit, editedFields]);

  const renderField = useCallback((field: ProfileField, index: number) => {
    const fieldValue =
      field.type === "select"
        ? field.options?.find((opt) => opt.id === Number(field.value))?.name ||
          field.displayValue ||
          "N/A"
        : field.value || "N/A";

    return (
      <Box key={field.label}>
        <Box className="flex space-between align-center" sx={{ mb: 1 }}>
          <Box>
            <Typography variant="subtitle2" className="tertiary-color">
              {field.label}
            </Typography>
            <Typography variant="body2" className="white-color">
              {fieldValue}
            </Typography>
          </Box>
        </Box>
        {index < data.fields.length - 1 && (
          <Divider sx={{ backgroundColor: "white", opacity: 0.5, mb: 1 }} />
        )}
      </Box>
    );
  }, []);

  const renderDialogField = useCallback(
    (field: ProfileField) => {
      if (field.type === "select") {
        const allOptions = field.options || clubs;
        const selectedOption = allOptions.find(
          (opt) => opt.id === Number(editedFields[field.label])
        );
        return (
          <Autocomplete
            key={field.label}
            options={allOptions}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name
            }
            value={selectedOption || null}
            onChange={(_, newValue) =>
              fieldChange(field.label, newValue ? newValue.id : null)
            }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disabled={isSaving || isLoadingOptions}
            loading={isLoadingOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                label={field.label}
                fullWidth
                margin="dense"
                sx={{
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
              />
            )}
            sx={{
              "& .MuiAutocomplete-popupIndicator": { color: "white" },
              "& .MuiAutocomplete-clearIndicator": { color: "white" },
            }}
            ListboxProps={{
              style: { backgroundColor: "white", color: "#1d2125" },
            }}
          />
        );
      }

      return (
        <TextField
          key={field.label}
          fullWidth
          margin="dense"
          label={field.label}
          value={editedFields[field.label] || ""}
          onChange={(e) => fieldChange(field.label, e.target.value)}
          disabled={isSaving}
          sx={{
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />
      );
    },
    [clubs, editedFields, fieldChange, isSaving, isLoadingOptions]
  );

  const roleColors = {
    Athlete: { color: "#FF4444", bgColor: "#ff44441a" },
    Coach: { color: "#3385FF", bgColor: "#3385ff1a" },
    Club: { color: "#9966FF", bgColor: "#9966ff1a" },
    Federation: { color: "#33CC77", bgColor: "#33cc771a" },
  };

  const getBadgeConfig = useCallback((role: string) => {
    return (
      roleColors[role as keyof typeof roleColors] || {
        color: "#9ac6ff",
        bgColor: "#9ac6ff1a",
      }
    );
  }, []);

  return (
    <>
      <Box className="Box flex align-start">
        <Card
          className="Card secondary-bg-color"
          sx={{
            width: { xs: "90%", sm: width, md: width },
            minWidth: "300px",
            maxWidth: "600px",
            height: "auto",
          }}
        >
          <Box
            className="banner full-width relative-position"
            sx={{
              backgroundColor: getBadgeConfig(role).bgColor,
              position: "relative",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <BadgeCheck size={24} color={getBadgeConfig(role).color} />
            </Box>
            <Avatar
              className="absolute-position"
              sx={{
                width: 100,
                height: 100,
                top: "100%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "4px solid #1d2125",
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

            {data.fields.map(renderField)}
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
        <DialogContent>{data.fields.map(renderDialogField)}</DialogContent>
        <DialogActions sx={{ pb: 3, pr: 3 }}>
          <Button onClick={close} color="error" disabled={isSaving}>
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
  connectionStatus,
  onConnect,
  role,
}) => {
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
            onClick={onConnect}
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

  const roleColors = {
    Athlete: { color: "#FF4444", bgColor: "#ff44441a" },
    Coach: { color: "#3385FF", bgColor: "#3385ff1a" },
    Club: { color: "#9966FF", bgColor: "#9966ff1a" },
    Federation: { color: "#33CC77", bgColor: "#33cc771a" },
  };

  const getBadgeConfig = useCallback((role: string) => {
    return (
      roleColors[role as keyof typeof roleColors] || {
        color: "#9ac6ff",
        bgColor: "#9ac6ff1a",
      }
    );
  }, []);

  return (
    <Box className="Box flex align-start">
      <Card
        className="Card secondary-bg-color"
        sx={{
          width: { xs: "90%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "600px",
          height: "auto",
        }}
      >
        <Box
          className="banner full-width relative-position"
          sx={{
            backgroundColor: getBadgeConfig(role!).bgColor,
            position: "relative",
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <BadgeCheck size={24} color={getBadgeConfig(role!).color} />
          </Box>
          <Avatar
            className="absolute-position"
            sx={{
              width: 100,
              height: 100,
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "4px solid #1d2125",
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
