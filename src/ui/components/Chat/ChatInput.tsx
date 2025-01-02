import { FC, SetStateAction, Dispatch } from "react";
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
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Type a message..."
    multiline
    maxRows={4}
    variant="outlined"
    InputProps={{
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
                : "rgba(255, 255, 255, 0.3)",
            }}
            disabled={!message.trim()}
          >
            <SendIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);

export default ChatInput;
