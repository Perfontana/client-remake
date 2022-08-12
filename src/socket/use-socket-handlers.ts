import { useEffect } from "react";
import Player from "../types/Player";
import Room from "../types/Room";
import { SocketClient } from "./socket-types";

export interface UseGameConnectionConfig {
  io: SocketClient | null;
  handlers: {
    onConnect?: () => any;
    onDisconnect?: () => any;
    onNewPlayerConnected?: (player: Player) => any;
    onPlayerDisconnected?: (player: Player) => any;
    onPlayerUpdated?: (player: Player) => any;
    onRoundTimerEnded?: () => any;
    onRoomUpdated?: (room: Partial<Room>) => any;
    onRoundStarted?: (message: { currentRound: number }) => any;
    onPlayerReady?: (player: Pick<Player, "name">) => any;
    onRoundEnded?: () => any;
    onGameEnded?: () => any;
  };
}

const useHandlerUpdate = (
  io: SocketClient | null,
  event: any,
  handler?: Function
) => {
  useEffect(() => {
    if (!handler || !io) return;

    io.on(event, handler);

    return () => {
      io.off(event, handler);
    };
  }, [io, handler]);
};

export const useSocketHandlers = ({
  io,
  handlers: {
    onConnect,
    onDisconnect,
    onNewPlayerConnected,
    onPlayerDisconnected,
    onPlayerUpdated,
    onRoundTimerEnded,
    onRoomUpdated,
    onRoundStarted,
    onRoundEnded,
    onGameEnded,
    onPlayerReady,
  },
}: UseGameConnectionConfig) => {
  useHandlerUpdate(io, "connect", onConnect);
  useHandlerUpdate(io, "disconnect", onDisconnect);
  useHandlerUpdate(io, "player-connected", onNewPlayerConnected);
  useHandlerUpdate(io, "player-disconnected", onPlayerDisconnected);
  useHandlerUpdate(io, "player-updated", onPlayerUpdated);
  useHandlerUpdate(io, "round-timer-ended", onRoundTimerEnded);
  useHandlerUpdate(io, "room-updated", onRoomUpdated);
  useHandlerUpdate(io, "round-started", onRoundStarted);
  useHandlerUpdate(io, "round-ended", onRoundEnded);
  useHandlerUpdate(io, "game-ended", onGameEnded);
  useHandlerUpdate(io, "player-ready", onPlayerReady);
};
