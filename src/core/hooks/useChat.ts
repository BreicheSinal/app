import { useState, useCallback, useEffect } from "react";
import { requestApi } from "../utils/request";
import { sendSocketMessage } from "../services/socket";

export interface ChatUser {
  chatID?: number;
  id: number;
  name: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
}

export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  chatID: number;
}

export const useChat = (currentUserId: number) => {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = useCallback(async () => {
    if (!currentUserId) return;

    try {
      setLoading(true);
      const response = await requestApi(`/user/chats/user/${currentUserId}`);
      setUsers(response.chats);
    } catch (err) {
      setError("Failed to fetch chats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  const fetchMessages = useCallback(
    async (chatID: number) => {
      try {
        setLoading(true);
        const url = `/user/chats/messages?chatID=${chatID}&userId=${currentUserId}`;
        const response = await requestApi(url, "GET");

        const messagesList = response?.messages || [];

        const messagesWithChatId = messagesList.map((msg: ChatMessage) => ({
          content: msg.content,
          id: Number(msg.id),
          senderId: Number(msg.senderId),
          receiverId: Number(msg.receiverId),
          chatID: Number(msg.chatID),
          timestamp: msg.timestamp,
        }));

        setMessages(messagesWithChatId);
      } catch (err) {
        setError("Failed to fetch messages");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [currentUserId]
  );

  useEffect(() => {
    if (currentUserId) {
      fetchChats();
    }
  }, [currentUserId, fetchChats]);

  const selectUser = useCallback(
    (user: ChatUser) => {
      if (user.chatID) {
        setSelectedChat(user.chatID);
        fetchMessages(user.chatID);
      } else {
        setMessages([]);
        setSelectedChat(null);
      }
    },
    [fetchMessages]
  );

  const addNewChat = useCallback((newUser: ChatUser) => {
    setUsers((prevUsers) => {
      if (!prevUsers.some((user) => user.id === newUser.id)) {
        return [...prevUsers, newUser];
      }
      return prevUsers;
    });

    if (newUser.chatID) {
      setSelectedChat(newUser.chatID);
      setMessages([]);
    }
  }, []);

  const sendMessage = async (message: string, chatId: number) => {
    if (!message?.trim() || !chatId) return;

    try {
      setLoading(true);

      const tempMessage: ChatMessage = {
        id: Date.now(),
        senderId: currentUserId,
        receiverId: users.find((u) => u.chatID === chatId)?.id || 0,
        content: message,
        timestamp: new Date().toISOString(),
        chatID: chatId,
      };

      setMessages((prev) => [...prev, tempMessage]);

      await sendSocketMessage(chatId, message);

      setUsers((prev) =>
        prev.map((user) =>
          user.chatID === chatId
            ? {
                ...user,
                lastMessage: message,
                time: new Date().toISOString(),
              }
            : user
        )
      );
    } catch (err) {
      setError("Failed to send message");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    messages,
    selectedChat,
    loading,
    error,
    selectUser,
    sendMessage,
    fetchChats,
    addNewChat,
  };
};
