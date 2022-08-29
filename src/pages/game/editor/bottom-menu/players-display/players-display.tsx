import { useToast } from "@chakra-ui/react";
import { useSocketHandlers } from "../../../../../socket/use-socket-handlers";
import game from "../../../../../store/game";
import { socketStore } from "../../../../../store/socket";
import Player from "../../../../../types/Player";
import { PlayersReadyToast } from "./players-ready-toast";

const soundPlayer = new Audio("/player-ready-sound.wav");
soundPlayer.volume = 0.1;

export const usePlayersReadynessToasts = () => {
  const toast = useToast({});

  const onPlayerReady = async ({ name }: Pick<Player, "name">) => {
    soundPlayer.play();

    const player = game.players.find((player) => player.name === name);

    if (!player) {
      console.error("Player is ready, but not found in the game store");
      return;
    }

    toast({
      position: "bottom-left",
      render: () => <PlayersReadyToast player={player} />,
    });
  };

  useSocketHandlers({
    io: socketStore.io,
    handlers: {
      onPlayerReady,
    },
  });
};
