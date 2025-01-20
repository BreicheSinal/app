import { FC } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { ChatUser } from "../../../core/hooks/chatHook";

interface ChatHeaderProps {
  selectedUser: ChatUser | null;
}

const ChatHeader: FC<ChatHeaderProps> = ({ selectedUser }) => {
  if (!selectedUser) return null;

  return (
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
      <Avatar sx={{ bgcolor: "primary.main", boxShadow: 1 }}>
        {selectedUser.avatar || selectedUser.name.charAt(0)}
      </Avatar>
      <Typography sx={{ color: "white", fontWeight: 500 }}>
        {selectedUser.name}
      </Typography>
    </Box>
  );
};

export default ChatHeader;
