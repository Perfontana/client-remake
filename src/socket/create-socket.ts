import { io } from "socket.io-client";
import { SocketClient } from "./socket-types";

const createSocket = (token: string): SocketClient =>
  io("/", { auth: { token }, autoConnect: false });

export default createSocket;
