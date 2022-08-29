import { HStack, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { language } from "../../../../../store/language";
import Player from "../../../../../types/Player";
import { PlayerAvatar } from "../../../lobby/player-avatar";

export interface PlayersReadyToastProps {
  player: Player;
}

export const PlayersReadyToast = observer(
  ({ player }: PlayersReadyToastProps) => {
    return (
      <HStack>
        <PlayerAvatar player={player} />
        <Text> {language.ui.editor.bottomMenu.playerIsReady}</Text>
      </HStack>
    );
  }
);
