// ConnectionDialog.tsx
import { FC, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  Autocomplete,
  Avatar,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { requestApi } from "../../../core/utils/request";

interface User {
  id: number;
  name: string;
}

interface Connection {
  status: string;
  user: User;
  connectedUser: User;
}

interface ConnectionDialogProps {
  open: boolean;
  onClose: () => void;
  currentUserId: number;
  onSelectUser: (user: { id: number; name: string; chatID: number }) => void;
}

const ConnectionDialog: FC<ConnectionDialogProps> = ({
  open,
  onClose,
  currentUserId,
  onSelectUser,
}) => {
  const [connections, setConnections] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (!currentUserId || !open) return;

    const fetchConnections = async () => {
      setLoading(true);
      try {
        const response = await requestApi(`/user/accepted/${currentUserId}`);
        if (response?.connections) {
          const connectionsData = response.connections.map(
            (connection: Connection) => {
              const otherUser =
                String(connection.user.id) !== String(currentUserId)
                  ? connection.user
                  : connection.connectedUser;

              return {
                id: otherUser.id,
                name: otherUser.name,
              };
            }
          );
          setConnections(connectionsData);
        }
      } catch (err) {
        setError("Failed to fetch connections");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [currentUserId, open]);

  const handleUserSelect = async (user: User | null) => {
    if (!user) return;

    try {
      const response = await requestApi("/user/chats", "POST", {
        user1Id: currentUserId,
        user2Id: user.id,
      });

      const chatID = response.chat.id;

      onSelectUser({
        id: user.id,
        name: user.name,
        chatID: Number(chatID),
      });

      onClose();
    } catch (err) {
      console.error("Chat API Error:", err);
      setError("Failed to create chat");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#1a1a1a",
          minWidth: "400px",
        },
      }}
    >
      <DialogTitle className="bold tertiary-color">New Chat</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={connections.filter(
            (connection) =>
              connection.name
                .toLowerCase()
                .includes(searchText.toLowerCase()) && searchText.length > 0
          )}
          loading={loading}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, newValue) => handleUserSelect(newValue)}
          inputValue={searchText}
          onInputChange={(_, newInputValue) => setSearchText(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search connections..."
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                  </InputAdornment>
                ),
                endAdornment: loading && (
                  <CircularProgress
                    color="inherit"
                    size={20}
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: "white",
                  backgroundColor: "#333",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                backgroundColor: "#1a1a1a",
                color: "white",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <Avatar
                sx={{ bgcolor: "primary.main", width: 32, height: 32, mr: 2 }}
              >
                {option.name.charAt(0)}
              </Avatar>
              <Typography>{option.name}</Typography>
            </Box>
          )}
          ListboxProps={{
            sx: {
              backgroundColor: "#5D5C5C",
              color: "white",
              "& .MuiAutocomplete-option": {
                backgroundColor: "#5D5C5C",
                color: "white",
                "&:hover": {
                  backgroundColor: "#606060",
                },
              },
            },
          }}
        />
        {error && (
          <Typography variant="caption" sx={{ color: "error.main", mt: 1 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionDialog;
