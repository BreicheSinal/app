import { FC, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ChatUser } from "../../../core/hooks/useChat";
import ChatDialog from "./ChatDialog";
import ChatSearch from "./ChatSearch";

interface ChatListProps {
  users: ChatUser[];
  currentUser: ChatUser;
  selectedUser: ChatUser | null;
  onUserSelect: (user: ChatUser) => void;
  onNewChat?: (user: ChatUser) => void;
}

const ChatList: FC<ChatListProps> = ({
  users,
  currentUser,
  selectedUser,
  onUserSelect,
  onNewChat,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleNewConnection = async (user: {
    id: number;
    name: string;
    chatID: number;
  }) => {
    const newChatUser: ChatUser = {
      id: user.id,
      name: user.name,
      chatID: user.chatID,
      lastMessage: "",
      time: new Date().toISOString(),
    };

    if (onNewChat) {
      onNewChat(newChatUser);
    }

    onUserSelect(newChatUser);
    setDialogOpen(false);
  };

  const handleSearch = (text: string) => {
    setSearchText(text.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.id !== currentUser.id &&
      (!searchText || user.name.toLowerCase().includes(searchText))
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#90caf9",
            fontWeight: 600,
          }}
        >
          Chats
        </Typography>
        <Tooltip title="Create new chat">
          <IconButton
            size="small"
            onClick={() => setDialogOpen(true)}
            sx={{
              color: "#90caf9",
              "&:hover": {
                backgroundColor: "rgba(144, 202, 249, 0.08)",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <ChatSearch onSearch={handleSearch} />

      <List sx={{ flex: 1, overflow: "auto" }}>
        {filteredUsers.map((user, index) => (
          <div key={user.id}>
            <ListItem
              onClick={() => onUserSelect(user)}
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
                <Avatar sx={{ bgcolor: "primary.main", boxShadow: 1 }}>
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
                  <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {user.lastMessage}
                  </Typography>
                }
              />
              <Typography sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                {user.time}
              </Typography>
            </ListItem>
            {index < filteredUsers.length - 1 && (
              <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
            )}
          </div>
        ))}
      </List>

      <ChatDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        currentUserId={currentUser.id}
        onSelectUser={handleNewConnection}
      />
    </Box>
  );
};

export default ChatList;
