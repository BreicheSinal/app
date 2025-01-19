import { FC, useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchFederationOptions } from "../../../core/utils/fetchDetails";
import { styles } from "./style";

interface Federation {
  id: number;
  name: string;
}

interface AddTrophyFormProps {
  onAdd: (trophy: {
    name: string;
    description: string;
    federationId: number;
  }) => void;
  isLoading: boolean;
}

export const RequestTrophy: FC<AddTrophyFormProps> = ({ onAdd, isLoading }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [federations, setFederations] = useState<Federation[]>([]);
  const [selectedFederation, setSelectedFederation] =
    useState<Federation | null>(null);
  const [loadingFederations, setLoadingFederations] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    federation: false,
  });

  useEffect(() => {
    const loadFederations = async () => {
      setLoadingFederations(true);
      try {
        const options = await fetchFederationOptions();
        setFederations(options);
      } catch (error) {
        console.error("Failed to fetch federations:", error);
      } finally {
        setLoadingFederations(false);
      }
    };

    loadFederations();
  }, []);

  const handleSubmit = () => {
    if (name && selectedFederation && !isLoading) {
      onAdd({
        name,
        description,
        federationId: selectedFederation.id,
      });
      setName("");
      setDescription("");
      setSelectedFederation(null);
      setTouched({ name: false, federation: false });
    }
  };

  const showNameError = touched.name && !name;
  const showFederationError = touched.federation && !selectedFederation;

  return (
    <Card className="secondary-bg-color" sx={styles.card}>
      <CardContent sx={{ p: 2 }}>
        <Box className="flex space-between align-center" sx={{ mb: 2 }}>
          <Typography variant="h6" className="tertiary-color" sx={styles.title}>
            REQUEST TROPHY
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={styles.label}>
                Trophy Name<span className="required">*</span>
              </Typography>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                placeholder="Name"
                size="small"
                required
                error={showNameError}
                helperText={showNameError ? "Trophy name is required" : ""}
                disabled={isLoading}
                sx={styles.textField}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={styles.label}>
                Federation<span className="required">*</span>
              </Typography>
              <Autocomplete
                value={selectedFederation}
                onChange={(_, newValue) => setSelectedFederation(newValue)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, federation: true }))
                }
                options={federations}
                getOptionLabel={(option) => option.name}
                loading={loadingFederations}
                disabled={isLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Federation"
                    size="small"
                    required
                    error={showFederationError}
                    helperText={
                      showFederationError ? "Federation is required" : ""
                    }
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingFederations ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                    sx={styles.textField}
                  />
                )}
                sx={styles.autocompleteEndAdornment}
                slotProps={{
                  popper: {
                    sx: styles.autocompletePopper,
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={styles.label}>
              Description
            </Typography>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description"
              size="small"
              multiline
              rows={2}
              disabled={isLoading}
              sx={styles.textField}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              disableRipple
              onClick={handleSubmit}
              disabled={isLoading || !name || !selectedFederation}
              sx={styles.submitButton}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <AddIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
