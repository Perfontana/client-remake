import { useToast } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameConnection } from "../../socket/use-game-connection";
import { auth } from "../../store/auth";
import game from "../../store/game";

export interface GameProps {}

export const Game = observer(({ children }: GameProps & PropsWithChildren) => {
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    game.loadRoom();
  }, [auth.token]);

  const io = useGameConnection({
    token: auth.token,
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
        navigate(`/room/${game.code}/results`);
      },
    },
  });

  useEffect(() => {
    if (io) io.open();

    return () => {
      if (io) io.close();
    };
  }, [io]);

  if (game.isStarted) {
    if (game.isEnded) navigate(`/room/${game.code}/results`);
    else navigate(`/room/${game.code}/editor`);
  }

  return <>{children}</>;
});

Game.displayName = "Game";
