import { Avatar, AvatarBadge, Box, HStack, Icon } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { TbCrown } from "react-icons/tb";
import Player from "../../../types/Player";

export interface PlayerAvatarProps {
  player: Player;
}

export const PlayerAvatar = observer(({ player }: PlayerAvatarProps) => {
  return (
    <Avatar src={`/uploads/${player.avatar}`} name={player.name}>
      <AvatarBadge
        bg={player.isOnline ? "green.500" : "tomato"}
        boxSize="1.2rem"
      />
    </Avatar>
  );
});
