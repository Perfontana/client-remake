import { action, makeAutoObservable, runInAction } from "mobx";
import { isErrorResponse } from "../api/config";
import { getRoom, getSong, startGame } from "../api/rooms";
import { SocketClient } from "../socket/socket-types";
import Player from "../types/Player";
import { auth } from "./auth";
import { Sample } from "./sample";
import tracks from "./tracks";

class Game {
  loading: boolean = false;
  error: any = "";
  name: string = "";
  maximumPlayers: number = 0;
  roundTime: number = 0;
  isStarted: boolean = false;
  currentRound: number = 0;
  code: string = "";
  players: Player[] = [];
  isEnded: boolean = false;
  timeLeft: number = 0;
  rounds: {
    player: string;
    song: string;
    sent: boolean;
  }[][] = [];
  songs: Record<string, { player: string; url: string }[]> = {};

  authorizedPlayer: Player | null = null;

  socket: SocketClient | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadRoom() {
    try {
      const { data: room } = await getRoom();

      if (isErrorResponse(room)) {
        return;
      }

      const authorizedPlayer = room.players.find((p) => p.name === auth.name);

      runInAction(() =>
        this.set({ loading: false, authorizedPlayer, ...room })
      );
    } catch (e) {
      console.log(e);
      runInAction(() => this.set({ loading: false, error: e }));
    }
  }

  start() {
    startGame();
  }

  isOwner(playerName: string) {
    const owner = this.players.find((player) => player.isOwner);
    return playerName === owner?.name;
  }

  set(values: Partial<Game>) {
    Object.assign(this, values);
  }

  clear() {
    this.name = "";
    this.maximumPlayers = 0;
    this.roundTime = 0;
    this.code = "";
    this.players = [];
    this.isStarted = false;
    this.currentRound = 0;
    this.endTimer();
  }

  async loadRoundSong() {
    const { data: response } = await getSong();

    if (isErrorResponse(response)) {
      return;
    }

    if (response.url === "FIRST_ROUND") return;

    tracks.addTrack();

    await Sample.loadFromUrl(response.url, response.url, tracks.tracks[0]);
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  updatePlayer(playerToUpdate: Player) {
    this.players = this.players.map((player) => {
      if (player.name === playerToUpdate.name) {
        Object.assign(player, playerToUpdate);
      }

      return player;
    });
  }

  removePlayer(player: Pick<Player, "name">) {
    const playerIndex = this.players.findIndex((p) => p.name === player.name);
    if (playerIndex < 0) return;
    this.players.splice(playerIndex, 1);
  }

  private timer: any = null;
  startTimer(elapsed: number) {
    this.endTimer();

    this.timeLeft = this.roundTime - elapsed;
    this.timer = setInterval(
      action(() => {
        this.timeLeft -= 1;
      }),
      1000
    );
  }

  endTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timeLeft = this.roundTime;
  }
}

const game = new Game();

export default game;
