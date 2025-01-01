import { FC, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  InputAdornment,
  Paper,
} from "@mui/material";
import {
  Send as SendIcon,
  InsertEmoticon as EmojiIcon,
  AttachFile as AttachIcon,
} from "@mui/icons-material";

import { ChatUser } from "../../../core/hooks/chatHook";
import { ChatMessage } from "../../../core/hooks/chatHook";

interface ChatComponentProps {
  users: ChatUser[];
  currentUser: ChatUser;
  messages: ChatMessage[];
  onSendMessage?: (message: string, receiverId: number) => void;
  onUserSelect?: (user: ChatUser) => void;
}

const ChatComponent: FC<ChatComponentProps> = ({
  users,
  currentUser,
  messages,
  onSendMessage,
  onUserSelect,
}) => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

  const send = () => {
    if (message.trim() && onSendMessage && selectedUser) {
      onSendMessage(message, selectedUser.id);
      setMessage("");
    }
  };

  const userClick = (user: ChatUser) => {
    setSelectedUser(user);
    if (onUserSelect) {
      onUserSelect(user);
    }
  };

  const keyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        width: "80vw",
        backgroundColor: "#1a1a1a",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Chat list users */}
      <Box
        sx={{
          width: "300px",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#242424",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#90caf9",
            p: 2,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            fontWeight: 600,
          }}
        >
          Chats
        </Typography>

        <List sx={{ flex: 1, overflow: "auto" }}>
          {users
            .filter((user) => user.id !== currentUser.id)
            .map((user, index) => (
              <Box key={user.id}>
                <ListItem
                  onClick={() => userClick(user)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedUser?.id === user.id
                        ? "rgba(144, 202, 249, 0.08)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedUser?.id === user.id
                          ? "rgba(144, 202, 249, 0.12)"
                          : "rgba(255, 255, 255, 0.05)",
                    },
                    transition: "background-color 0.2s",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        boxShadow: 1,
                      }}
                    >
                      {user.avatar || user.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: "white", fontWeight: 500 }}>
                        {user.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        noWrap
                      >
                        {user.lastMessage}
                      </Typography>
                    }
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                  >
                    {user.time}
                  </Typography>
                </ListItem>
                {index < users.length - 2 && (
                  <Divider
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  />
                )}
              </Box>
            ))}
        </List>
      </Box>

      {/* Chat window */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#1a1a1a",
        }}
      >
        {/* Chat Header */}
        {selectedUser && (
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: "#242424",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                boxShadow: 1,
              }}
            >
              {selectedUser.avatar || selectedUser.name.charAt(0)}
            </Avatar>
            <Typography sx={{ color: "white", fontWeight: 500 }}>
              {selectedUser.name}
            </Typography>
          </Box>
        )}

        {/* Chat Area */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {messages.map((msg) => {
            const isCurrentUser = msg.senderId === currentUser.id;
            return (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                {!isCurrentUser && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "primary.main",
                      boxShadow: 1,
                    }}
                  >
                    {selectedUser?.avatar || selectedUser?.name.charAt(0)}
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: "70%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                  }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      backgroundColor: isCurrentUser
                        ? "primary.main"
                        : "background.paper",
                      color: isCurrentUser ? "white" : "text.primary",
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  >
                    <Typography variant="body1">{msg.content}</Typography>
                  </Paper>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                    }}
                  >
                    {msg.timestamp}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Chat Input Bar */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            bgcolor: "#242424",
          }}
        >
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={keyPress}
            placeholder="Type a message..."
            multiline
            maxRows={4}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    size="small"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    <EmojiIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    <AttachIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={send}
                    sx={{
                      color: message.trim()
                        ? "primary.main"
                        : "rgba(255, 255, 255, 0.3)",
                      "&:hover": {
                        color: message.trim()
                          ? "primary.light"
                          : "rgba(255, 255, 255, 0.3)",
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
                color: "white",
                backgroundColor: "#1a1a1a",
                "&:hover": {
                  backgroundColor: "#242424",
                },
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.1)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatComponent;
