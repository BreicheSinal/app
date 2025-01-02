import { io, Socket } from "socket.io-client";
import { ChatMessage } from "../hooks/chatHook";

let socket: Socket | null = null;

export const connect = (userId: number) => {
  socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to socket server");
    socket?.emit("join", userId);
  });
};

export const disconnect = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const sendMessage = (receiverId: number, message: string) => {
  socket?.emit("sendMessage", { receiverId, message });
};

export const onNewMessage = (
  callback: (data: ChatMessage) => void
) => {
  socket?.on("newMessage", callback);
};

export const removeAllListeners = () => {
  if (socket) {
    socket.removeAllListeners();
  }
};
