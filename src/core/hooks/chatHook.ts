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
    async (chatID: number) => {
      try {
        setLoading(true);
        const url = `/user/chats/messages?chatID=${chatID}&userId=${currentUserId}`;
        const response = await requestApi(url, "GET");
        console.log(url, response);

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

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
    }
  }, [selectedChat, fetchMessages]);

  const sendMessage = async (message: string, chatId: number) => {
    if (!message?.trim() || !chatId) return;

    try {
      setLoading(true);
      console.log("here" + currentUserId, chatId, message);
      const response = await requestApi("/user/chats/messages", "POST", {
        senderId: currentUserId,
        chatId: chatId,
        message: message.trim(),
      });

      if (response) {
        setMessages((prev) => [...prev, { ...response, chatID: chatId }]);
        await fetchMessages(chatId);
        console.log("msg sent!");
      }
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
    selectUser: useCallback(
      (user: ChatUser) => {
        console.log("Selecting user with chatID:", user.chatID);
        setSelectedChat(user.chatID!);
        fetchMessages(user.chatID!);
      },
      [fetchMessages]
    ),
    sendMessage,
    fetchChats,
  };
};
