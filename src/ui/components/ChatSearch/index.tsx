import { FC, useState, useEffect } from "react";
import {
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

interface ChatSearchProps {
  currentUserId: number;
  onSelectUser: (user: { id: number; name: string; chatId: number }) => void;
}

const ChatSearch: FC<ChatSearchProps> = ({ currentUserId, onSelectUser }) => {
  const [connections, setConnections] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (!currentUserId) return;

    const fetchConnections = async () => {
      setLoading(true);
      try {
        console.log("Fetching connections for user ID:", currentUserId);
        const response = await requestApi(`/user/accepted/${currentUserId}`);
        console.log("API Response:", response);

        if (response?.connections) {
          const connectionsData = response.connections.map(
            (connection: Connection) => {
              console.log("Processing connection:", connection);

              const otherUser =
                String(connection.user.id) !== String(currentUserId)
                  ? connection.user
                  : connection.connectedUser;

              console.log("Selected other user:", otherUser);

              return {
                id: otherUser.id,
                name: otherUser.name,
              };
            }
          );

          setConnections(connectionsData);
        } else {
          setError("No connections found");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch connections");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [currentUserId]);

  const userSelect = async (user: User | null) => {
    if (!user) return;

    try {
      const response = await requestApi("/user/chats", "POST", {
        user1Id: currentUserId,
        user2Id: user.id,
      });
      console.log("Chat API Response:", response);

      const chatId = response.AlreadyExists
        ? response.AlreadyExists.id
        : response.id;
      onSelectUser({ id: user.id, name: user.name, chatId });
    } catch (err) {
      console.error("Chat API Error:", err);
      setError("Failed to create chat");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Autocomplete
        options={connections.filter(
          (connection) =>
            connection.name.toLowerCase().includes(searchText.toLowerCase()) &&
            searchText.length > 0
        )}
        loading={loading}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_, newValue) => userSelect(newValue)}
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
            backgroundColor: "#1a1a1a",
            color: "white",
            "& .MuiAutocomplete-option": {
              backgroundColor: "#1a1a1a",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
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
    </Box>
  );
};

export default ChatSearch;
