import { useState, useCallback, useEffect } from "react";
import { requestApi } from "../utils/request";

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
    async (chatId: number) => {
      try {
        setLoading(true);
        const url = `/user/chats/messages?chatId=${chatId}&userId=${currentUserId}`;
        const response = await requestApi(url, "GET");
        console.log(url, response);

        if (response?.messages) {
          const messagesWithChatId = response.messages.map(
            (msg: ChatMessage) => ({
              content: msg.content,
              id: Number(msg.id),
              senderId: Number(msg.senderId),
              receiverId: Number(msg.receiverId),
              chatID: Number(msg.chatID),
              timestamp: msg.timestamp,
            })
          );

          setMessages(messagesWithChatId);
        }
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

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
    }
  }, [selectedChat, fetchMessages]);

  return {
    users,
    messages,
    selectedChat,
    loading,
    error,
  };
};
