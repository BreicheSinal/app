import { FC } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";

interface ChatUser {
  id: number;
  name: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
}

interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

interface ChatComponentProps {
  users: ChatUser[];
  currentUser: ChatUser;
  messages: ChatMessage[];
  onSendMessage?: (message: string, receiverId: number) => void;
  onUserSelect?: (user: ChatUser) => void;
}

const ChatComponent: FC<ChatComponentProps> = ({ users, currentUser }) => {
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
          Messages
        </Typography>

        <List sx={{ flex: 1, overflow: "auto" }}>
          {users
            .filter((user) => user.id !== currentUser.id)
            .map((user, index) => (
              <Box key={user.id}>
                <ListItem
                  sx={{
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
    </Box>
  );
};

export default ChatComponent;
