import { Badge } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { language } from "../store/language";
import Room from "../types/Room";

export interface RoomStatusBadge {
  room: Room;
}

export const RoomStatusBadge = observer(({ room }: RoomStatusBadge) => {
  if (room.isStarted) {
    if (room.isEnded)
      return <Badge>{language.ui.activeRoomNotice.ended}</Badge>;
    else
      return (
        <Badge>
          {language.ui.activeRoomNotice.round}: {room.currentRound}
        </Badge>
      );
  }
  return (
    <Badge colorScheme="green">{language.ui.activeRoomNotice.notStarted}</Badge>
  );
});
