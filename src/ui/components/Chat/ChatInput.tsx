import { FC, SetStateAction, Dispatch, ChangeEvent } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import {
  Send as SendIcon,
  InsertEmoticon as EmojiIcon,
  AttachFile as AttachIcon,
} from "@mui/icons-material";

interface ChatInputProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  onSend: () => void;
}

const ChatInput: FC<ChatInputProps> = ({ message, setMessage, onSend }) => (
  <TextField
    fullWidth
    value={message}
    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setMessage(e.target.value)
    }
    placeholder="Type a message..."
    multiline
    maxRows={4}
    variant="outlined"
    InputProps={{
      style: {
        color: "white",
      },
      startAdornment: (
        <InputAdornment position="start">
          <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            <EmojiIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            <AttachIcon />
          </IconButton>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            size="small"
            onClick={onSend}
            sx={{
              color: message.trim()
                ? "primary.main"
                : "rgba(128, 128, 128, 0.5)",
              "&.Mui-disabled": {
                color: "rgba(128, 128, 128, 0.5)",
              },
            }}
            disabled={!message.trim()}
          >
            <SendIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderWidth: "1px 0 0 0",
          borderColor: "gray",
        },
        "&:hover fieldset": {
          borderColor: "gray",
        },
        "&.Mui-focused fieldset": {
          borderColor: message.trim() ? "primary.main" : "gray",
          borderWidth: "1px 0 0 0", 
        },
        "&.Mui-selected": {
          outline: "none", 
        },
      },
      "& .MuiInputBase-input::placeholder": {
        color: "gray",
        opacity: 1,
      },
    }}
  />
);

export default ChatInput;
