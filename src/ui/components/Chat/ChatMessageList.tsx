import { FC } from "react";
import { Box, Paper, Typography, Avatar } from "@mui/material";
import { ChatMessage, ChatUser } from "../../../core/hooks/useChat";
import { formatTime } from "../../../core/utils/time";

interface ChatMessageListProps {
  messages: ChatMessage[];
  currentUser: ChatUser;
  selectedUser: ChatUser | null;
}

const ChatMessageList: FC<ChatMessageListProps> = ({
  messages = [],
  currentUser,
  selectedUser,
}) => (
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
    {messages?.map((msg, index) => {
      const isCurrentUser = Number(msg.senderId) === Number(currentUser.id);
      return (
        <Box
          key={`${msg.id}-${index}`}
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
              {selectedUser?.avatar || selectedUser?.name?.charAt(0)}
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
              {formatTime(msg.timestamp)}
            </Typography>
          </Box>
        </Box>
      );
    })}
  </Box>
);

export default ChatMessageList;
