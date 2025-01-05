import { io, Socket } from "socket.io-client";
import { ChatMessage } from "../hooks/chatHook";

export let socket: Socket | null = null;

export const connect = (userId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
    const SERVER_URL = `http://localhost:${SERVER_PORT}`;

    socket = io(SERVER_URL, {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ["websocket", "polling"],
      path: "/socket.io/",
    });

    socket.on("connect", () => {
      console.log("Connected to socket server with ID:", socket?.id);
      socket?.emit("join", userId);
      resolve();
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      reject(error);
    });

    socket.on("newMessage", (data) => {
      console.log("Socket received message:", data);
    });
  });
};

export const joinChat = async (chatId: number) => {
  if (!socket?.connected) {
    throw new Error("Socket not connected. Cannot join chat.");
  }
  socket.emit("joinChat", chatId);
};

export const sendSocketMessage = async (chatId: number, message: string) => {
  if (!socket?.connected) {
    throw new Error("Socket not connected. Cannot send message.");
  }
  socket.emit("sendMessage", { chatId, message });
  console.log("msg sent!");
};

export const onNewMessage = (callback: (data: ChatMessage) => void) => {
  if (!socket) {
    throw new Error("Socket not initialized. Cannot listen for messages.");
  }

  socket.off("newMessage");
  socket.on("newMessage", (data) => {
    callback({
      id: data.id,
      content: data.message,
      senderId: data.senderId,
      receiverId: data.receiverId,
      chatID: data.chatId,
      timestamp: data.timestamp,
    });
  });
};

export const removeAllListeners = () => {
  socket?.removeAllListeners();
};

export const disconnect = () => {
  socket?.disconnect();
  socket = null;
};
