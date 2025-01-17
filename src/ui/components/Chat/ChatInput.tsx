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
  disabled?: boolean;
}

const ChatInput: FC<ChatInputProps> = ({
  message,
  setMessage,
  onSend,
  disabled = false, 
}) => (
  <TextField
    fullWidth
    value={message}
    onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setMessage(e.target.value)
    }
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey && !disabled) {
        e.preventDefault();
        onSend();
      }
    }}
    disabled={disabled}
    placeholder={
      disabled ? "Select a chat to start messaging..." : "Type a message..."
    }
    multiline
    maxRows={4}
    variant="outlined"
    InputProps={{
      style: {
        color: disabled ? "rgba(255, 255, 255, 0.5)" : "white",
      },
      startAdornment: (
        <InputAdornment position="start">
          <IconButton
            size="small"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "&.Mui-disabled": {
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
            disabled={disabled}
          >
            <EmojiIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "&.Mui-disabled": {
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
            disabled={disabled}
          >
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
              color:
                message.trim() && !disabled
                  ? "primary.main"
                  : "rgba(128, 128, 128, 0.5)",
              "&.Mui-disabled": {
                color: "rgba(128, 128, 128, 0.5)",
              },
              "&:hover": {
                backgroundColor:
                  message.trim() && !disabled
                    ? "rgba(144, 202, 249, 0.08)"
                    : "transparent",
              },
            }}
            disabled={!message.trim() || disabled}
          >
            <SendIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        backgroundColor: disabled ? "rgba(255, 255, 255, 0.03)" : "transparent",
        "& fieldset": {
          borderWidth: "1px 0 0 0",
          borderColor: "rgba(255, 255, 255, 0.1)",
        },
        "&:hover fieldset": {
          borderColor: disabled
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(255, 255, 255, 0.2)",
        },
        "&.Mui-focused fieldset": {
          borderColor:
            message.trim() && !disabled
              ? "primary.main"
              : "rgba(255, 255, 255, 0.1)",
          borderWidth: "1px 0 0 0",
        },
        "&.Mui-disabled": {
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
      "& .MuiInputBase-input": {
        "&.Mui-disabled": {
          WebkitTextFillColor: "rgba(255, 255, 255, 0.3)",
        },
      },
      "& .MuiInputBase-input::placeholder": {
        color: disabled
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(255, 255, 255, 0.5)",
        opacity: 1,
      },
    }}
  />
);

export default ChatInput;
