import { makeAutoObservable } from "mobx";
import { makeAutoSave } from "../utils/store-autosave";

class AuthState {
  token = "";
  name = "";
  room = "";

  constructor() {
    makeAutoObservable(this);
    makeAutoSave(this, AuthState.name);
  }

  setAuthData(token: string, room: string, name: string) {
    this.token = token;
    this.room = room;
    this.name = name;
  }

  clear() {
    this.token = "";
    this.room = "";
    this.name = "";
  }
}

export const auth = new AuthState();
