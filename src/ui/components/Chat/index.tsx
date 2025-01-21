import { FC, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ChatUser, ChatMessage, useChat } from "../../../core/hooks/useChat";
import {
  connect,
  joinChat,
  removeAllListeners,
  disconnect,
  socket,
  onNewMessage,
} from "../../../core/services/socket";
import ChatList from "./ChatList";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";

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
  onUserSelect,
}) => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>(users);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages);

  const { sendMessage } = useChat(currentUser.id);

  useEffect(() => {
    let isMounted = true;

    const initSocket = async () => {
      try {
        if (!socket) {
          await connect(currentUser.id);
        }
        if (selectedUser?.chatID && isMounted) {
          await joinChat(selectedUser.chatID);
        }
      } catch (error) {
        console.error("Socket error:", error);
      }
    };

    initSocket();

    return () => {
      isMounted = false;
      removeAllListeners();
      disconnect();
    };
  }, [currentUser.id, selectedUser?.chatID]);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const send = async () => {
    if (message.trim() && selectedUser?.chatID) {
      const messageText = message.trim();
      setMessage("");

      try {
        await sendMessage(messageText, selectedUser.chatID);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    onNewMessage((newMessage) => {
      if (
        selectedUser &&
        newMessage.chatID === selectedUser.chatID &&
        newMessage.senderId !== currentUser.id
      ) {
        setLocalMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      removeAllListeners();
    };
  }, [selectedUser, currentUser.id]);

  useEffect(() => {
    setChatUsers(users);
  }, [users]);

  const userClick = async (user: ChatUser) => {
    setSelectedUser(user);
    if (onUserSelect) {
      try {
        await onUserSelect(user);
      } catch (error) {
        console.error("Error fetching messages for user:", error);
      }
    }
  };

  const handleNewChat = async (newUser: ChatUser) => {
    setChatUsers((prevUsers) => {
      if (!prevUsers.some((user) => user.id === newUser.id)) {
        return [...prevUsers, newUser];
      }
      return prevUsers;
    });

    setSelectedUser(newUser);
    if (onUserSelect) {
      try {
        await onUserSelect(newUser);
      } catch (error) {
        console.error("Error fetching messages for user:", error);
      }
    }
    setLocalMessages([]);
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
        <ChatList
          users={chatUsers}
          currentUser={currentUser}
          selectedUser={selectedUser}
          onUserSelect={userClick}
          onNewChat={handleNewChat}
        />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ChatHeader selectedUser={selectedUser} />
        <ChatMessageList
          messages={localMessages}
          currentUser={currentUser}
          selectedUser={selectedUser}
        />
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSend={send}
          disabled={!selectedUser}
        />
      </Box>
    </Box>
  );
};

export default ChatComponent;
