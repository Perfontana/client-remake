import { HStack, Text, VStack } from "@chakra-ui/react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useSocketHandlers } from "../../../../../socket/use-socket-handlers";
import { auth } from "../../../../../store/auth";
import game from "../../../../../store/game";
import { socketStore } from "../../../../../store/socket";
import Player from "../../../../../types/Player";
import { PlayerAvatar } from "../../../lobby/player-avatar";

const player = new Audio("/player-ready-sound.wav");
player.volume = 0.1;

export const PlayersDisplay = observer(() => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers(game.players);
  }, [game.players]);

  const onRoundStarted = async () => {
    setPlayers(game.players);
  };

  const onPlayerReady = async ({ name }: Pick<Player, "name">) => {
    console.log(name, " is ready!");

    player.play();
    setPlayers((players) => players.filter((player) => player.name !== name));
  };

  useSocketHandlers({
    io: socketStore.io,
    handlers: {
      onRoundStarted,
      onPlayerReady,
    },
  });

  return (
    <VStack
      bg={"gray.500"}
      color={"white"}
      p={2}
      borderRadius={"md"}
      align="flex-start"
    >
      <Text>Waiting for players...</Text>
      <HStack>
        {players.map((p) => (
          <PlayerAvatar player={p} key={p.name} />
        ))}
      </HStack>
    </VStack>
  );
});
