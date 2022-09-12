import axios from "axios";
import Player from "../types/Player";
import Room from "../types/Room";
import { ErrorResponse } from "./config";

interface TokenResponse {
  token: string;
}

type CreateRoomResponse = TokenResponse & { code: string };

export type CreateRoomType = Pick<Room, "players">;

export const createRoom = async (
  room: Pick<Partial<Room>, "maximumPlayers" | "roundTime">
) => {
  return axios.post<CreateRoomResponse | ErrorResponse>("/rooms", room);
};

export const updateRoom = async (data: Partial<Room>) => {
  return axios.put<CreateRoomResponse>("/rooms", data);
};

export const joinRoom = async (
  roomCode: string,
  player: { name: string; avatar: File | null }
) => {
  return axios.post<TokenResponse>(`/rooms/${roomCode}/join`, player, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getRoom = async () => {
  return axios.get<Room>(`/rooms`);
};

export const startGame = async () => {
  return axios.get<any>(`/rooms/start`);
};

export const removePlayer = async (playerName: string) => {
  return axios.delete<any>(`/rooms/players/${playerName}`);
};

export const getCurrentTime = async () => {
  return axios.get<any>("/rooms/timer");
};

export const sendSong = async (
  formData: FormData,
  onUploadProgress: (progress: ProgressEvent) => void
) => {
  return axios.post("/rooms/song", formData, { onUploadProgress });
};

export const getSong = async () => {
  return axios.get<{ url: string }>("/rooms/song");
};
