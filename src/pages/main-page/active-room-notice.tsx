import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Spinner,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { BsExclamation } from "react-icons/bs";
import { Link } from "react-router-dom";
import { isErrorResponse } from "../../api/config";
import { getRoom, removePlayer } from "../../api/rooms";
import { RoomStatusBadge } from "../../components/room-status-badge";
import { auth } from "../../store/auth";
import game from "../../store/game";
import { language } from "../../store/language";
import Room from "../../types/Room";

export const ActiveRoomNotice = observer(() => {
  const [isRoomLoading, { on, off }] = useBoolean(true);
  const [isErrored, { on: errorOn, off: errorOff }] = useBoolean(true);

  const [room, setRoom] = useState<Room | null>(null);

  const player = room?.players.find((p) => p.name === auth.name);

  const loadRoom = async () => {
    on();

    const response = await getRoom();

    if (isErrorResponse(response.data)) {
      if (response.data.statusCode === 401) auth.clear();

      off();
      errorOn();

      return;
    }

    setRoom(response.data);

    off();
    errorOff();
  };

  const leaveRoom = async () => {
    await removePlayer(auth.name);

    auth.clear();
  };

  useEffect(() => {
    loadRoom();
  }, [auth.token]);

  return (
    <Box bg="white" p={6} rounded="md" w={80}>
      {isRoomLoading ? (
        <Spinner />
      ) : isErrored ? (
        <HStack textAlign={"center"}>
          <Icon color={"red"} fontSize={"40px"} as={BsExclamation} />
          <Text>Can't load room data</Text>
        </HStack>
      ) : (
        <VStack spacing={5} align="stretch">
          <Text fontSize={20} borderBottom="1px dashed #9b9b9b">
            {language.ui.activeRoomNotice.title}
          </Text>
          <HStack justify={"space-between"}>
            <HStack>
              <Avatar
                name={player?.name}
                src={player?.avatar ? `/uploads/${player.avatar}` : ""}
              />
              <Text>{player?.name}</Text>
            </HStack>
            <Text fontSize={10}>{room?.code}</Text>
          </HStack>
          <HStack>
            <Badge>
              {language.ui.activeRoomNotice.players}: {room?.players.length}
            </Badge>
            <RoomStatusBadge room={room!} />
          </HStack>
          <Button as={Link} to={`/room/${room?.code}`} colorScheme="green">
            {language.ui.activeRoomNotice.join}
          </Button>
          <Button onClick={leaveRoom} colorScheme="red">
            {language.ui.activeRoomNotice.leave}
          </Button>
        </VStack>
      )}
    </Box>
  );
});
