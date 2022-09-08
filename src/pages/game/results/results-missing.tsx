import { HStack, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import Player from "../../../types/Player";
import { PlayerAvatar } from "../lobby/player-avatar";

export interface ResultsMissingProps {
  player?: Player;
}

export const ResultsMissing = observer(({ player }: ResultsMissingProps) => {
  return (
    <HStack p={6} bg={"gray.400"} align={"center"} justify="center">
      {player && <PlayerAvatar player={player} />}
      <Text>Skipped round</Text>
    </HStack>
  );
});
