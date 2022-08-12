import { makeAutoObservable } from "mobx";
import createSocket from "../socket/create-socket";
import { SocketClient } from "../socket/socket-types";

export class SocketStore {
  token: string = "";
  io: SocketClient | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  connect(token: string) {
    if (this.io && this.token === token) {
      return;
    }

    this.token = token;
    this.io = createSocket(token);
    this.io.open();
  }

  disconnect() {
    this.io?.close();

    this.token = "";
    this.io = null;
  }
}

export const socketStore = new SocketStore();
