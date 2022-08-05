import { useEffect, useState } from "react";
import Player from "../types/Player";
import Room from "../types/Room";
import createSocket from "./create-socket";
import { SocketClient } from "./socket-types";

export interface UseGameConnectionConfig {
  token?: string;
  handlers: {
    onConnect?: () => any;
    onDisconnect?: () => any;
    onNewPlayerConnected?: (player: Player) => any;
    onPlayerDisconnected?: (player: Player) => any;
    onPlayerUpdated?: (player: Player) => any;
    onRoundTimerEnded?: () => any;
    onRoomUpdated?: (room: Partial<Room>) => any;
    onRoundStarted?: (message: { currentRound: number }) => any;
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

export const useGameConnection = ({
  token,
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
  },
}: UseGameConnectionConfig) => {
  const [io, setIo] = useState(() => (token ? createSocket(token) : null));

  useEffect(() => {
    if (!token) return;

    setIo(createSocket(token));

    () => {
      io?.disconnect();
    };
  }, [token]);

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

  return io;
};
