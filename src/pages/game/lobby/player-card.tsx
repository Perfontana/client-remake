import {
  Avatar,
  AvatarBadge,
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { MdOutlineClose } from "react-icons/md";
import { TbCrown } from "react-icons/tb";
import { removePlayer } from "../../../api/rooms";
import game from "../../../store/game";
import Player from "../../../types/Player";
import { PlayerAvatar } from "./player-avatar";

export interface PlayerCardProps {
  player: Player;
}

export const PlayerCard = observer(({ player }: PlayerCardProps) => {
  const deletePlayer = async () => {
    await removePlayer(player.name);
  };

  return (
    <Box p={2} bg="gray.200" rounded={"md"}>
      <HStack>
        <HStack spacing={3}>
          <PlayerAvatar player={player} />
          {player.isOwner && <Icon color={"yellow.500"} as={TbCrown} />}
          <Text whiteSpace={"nowrap"}>{player.name}</Text>
        </HStack>

        {(game.authorizedPlayer?.isOwner ||
          game.authorizedPlayer?.name === player.name) && (
          <IconButton
            onClick={deletePlayer}
            colorScheme={"red"}
            rounded="full"
            size={5 as any}
            alignSelf="baseline"
            aria-label="Remove player"
            icon={<MdOutlineClose />}
          />
        )}
      </HStack>
    </Box>
  );
});
