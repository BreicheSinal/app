import { io, Socket } from "socket.io-client";

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
