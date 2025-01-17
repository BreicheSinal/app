import { FC } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ChatSearchProps {
  onSearch: (searchText: string) => void;
}

const ChatSearch: FC<ChatSearchProps> = ({ onSearch }) => {
  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        placeholder="Search chats..."
        onChange={(e) => onSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
            </InputAdornment>
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
    </Box>
  );
};

export default ChatSearch;
