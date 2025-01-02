import { FC, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ChatUser, ChatMessage } from "../../../core/hooks/chatHook";
import ChatList from "./ChatList";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import ChatSearch from "./ChatSearch";

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
  const [chatUsers, setChatUsers] = useState<ChatUser[]>(users);

  useEffect(() => {
    setChatUsers(users);
  }, [users]);

  const send = () => {
    console.log("Send triggered with:", { message, selectedUser });
    if (message.trim() && onSendMessage && selectedUser) {
      console.log("Calling onSendMessage with:", message, selectedUser.id);
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

  const searchUserSelect = async (searchUser: {
    id: number;
    name: string;
    chatID: number;
  }) => {
    const newChatUser: ChatUser = {
      id: searchUser.id,
      name: searchUser.name,
      chatID: searchUser.chatID,
      lastMessage: "",
      time: new Date().toISOString(),
    };

    if (!chatUsers.some((user) => user.id === searchUser.id)) {
      setChatUsers((prev) => [newChatUser, ...prev]);

      if (onUserSelect) {
        await onUserSelect(newChatUser);
      }
    }
    console.log("Creating chat user:", newChatUser);

    setSelectedUser(newChatUser);
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
      <Box
        sx={{
          width: "300px",
          borderRight: "1px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          flexDirection: "column",
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

        <ChatSearch
          currentUserId={currentUser.id}
          onSelectUser={searchUserSelect}
        />

        <ChatList
          users={chatUsers}
          currentUser={currentUser}
          selectedUser={selectedUser}
          onUserSelect={userClick}
        />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatHeader selectedUser={selectedUser} />
        <ChatMessageList
          messages={messages}
          currentUser={currentUser}
          selectedUser={selectedUser}
        />
        <ChatInput message={message} setMessage={setMessage} onSend={send} />
      </Box>
    </Box>
  );
};

export default ChatComponent;
