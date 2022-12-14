import { useToast } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocketHandlers } from "../../socket/use-socket-handlers";
import { audioBuffers } from "../../store/audioBuffers";
import { auth } from "../../store/auth";
import game from "../../store/game";
import { socketStore } from "../../store/socket";
import tracks from "../../store/tracks";
import waveforms from "../../store/waveforms";

export interface GameProps {}

export const Game = observer(({ children }: GameProps & PropsWithChildren) => {
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === auth.room) game.loadRoom();

    socketStore.connect(auth.token);
  }, [auth.token]);

  useSocketHandlers({
    io: socketStore.io,
    handlers: {
      onConnect() {
        toast({ title: "You are online!", status: "success" });
      },
      onDisconnect() {
        toast({ title: "You've been disconnected", status: "error" });
      },
      onNewPlayerConnected(player) {
        game.addPlayer(player);
      },
      onPlayerDisconnected(player) {
        if (player.name === auth.name) {
          auth.clear();
          navigate("/");
        }

        game.removePlayer(player);
      },
      onPlayerUpdated(player) {
        game.updatePlayer(player);
      },
      onRoomUpdated(room) {
        toast({ title: "Room updated" });
        game.set(room);
      },
      onRoundStarted({ currentRound }) {
        game.set({ currentRound });
        navigate(`/room/${game.code}/editor`);
      },
      onGameEnded() {
        tracks.clear();
        waveforms.clear();
        audioBuffers.clear();
        navigate(`/room/${game.code}/results`);
      },
    },
  });

  useEffect(() => {
    if (game.isStarted) {
      if (game.isEnded) navigate(`/room/${game.code}/results`);
      else navigate(`/room/${game.code}/editor`);
    }
  }, [game.isStarted, game.isEnded]);

  return <>{children}</>;
});

Game.displayName = "Game";
