import Player from "./Player";

export interface RoundPlayerResult {
  player: string;
  song: string;
  sent: boolean;
}

export interface Song {
  _id: string;
  player: string;
  url: string;
}

export default interface Room {
  code: string;
  name: string;
  maximumPlayers: number;
  roundTime: number;
  players: Player[];
  isStarted: boolean;
  isEnded: boolean;
  rounds: RoundPlayerResult[][];
  songs: Record<string, Song[]>;
  currentRound: number;
}
