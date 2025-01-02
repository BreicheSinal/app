import { FC } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import { ChatUser } from "../../../core/hooks/chatHook";

interface ChatListProps {
  users: ChatUser[];
  currentUser: ChatUser;
  selectedUser: ChatUser | null;
  onUserSelect: (user: ChatUser) => void;
}

const ChatList: FC<ChatListProps> = ({
  users,
  currentUser,
  selectedUser,
  onUserSelect,
}) => (
  <List sx={{ flex: 1, overflow: "auto" }}>
    {users
      .filter((user) => user.id !== currentUser.id)
      .map((user, index) => (
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
                <div style={{ color: "white", fontWeight: 500 }}>
                  {user.name}
                </div>
              }
              secondary={
                <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  {user.lastMessage}
                </div>
              }
            />
            <div style={{ color: "rgba(255, 255, 255, 0.5)" }}>{user.time}</div>
          </ListItem>
          {index < users.length - 1 && (
            <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
          )}
        </div>
      ))}
  </List>
);

export default ChatList;
