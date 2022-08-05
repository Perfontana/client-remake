import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { BsCheck } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { isErrorResponse } from "../../../api/config";
import { startGame, updateRoom } from "../../../api/rooms";
import { JoinRoomForm } from "../../../components/join-room-form";
import { auth } from "../../../store/auth";
import game from "../../../store/game";
import { language } from "../../../store/language";
import Room from "../../../types/Room";
import { JoinRoomModal } from "./join-room-modal";
import { PlayerCardList } from "./player-card-list";
import { RoomOptions } from "./room-options";

export interface LobbyProps {}

export const Lobby = observer(({}: LobbyProps) => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  if (game.isStarted) navigate(`/room/${id}/editor`);

  const updateRoomOptions = async (room: Partial<Room>) => {
    const { data: response } = await updateRoom(room);

    if (isErrorResponse(response)) {
      toast({
        title: language.ui.lobby.roomUpdateFail,
        status: "error",
      });

      return;
    }

    toast({
      title: language.ui.lobby.roomUpdateSuccess,
      status: "success",
    });
  };

  const start = async () => {
    const { data: response } = await startGame();

    if (isErrorResponse(response)) {
      toast({
        title: response.error,
        description: response.message,
        status: "error",
      });
    }
  };

  return (
    <>
      {!auth.token ? (
        <JoinRoomModal isOpen={!auth.token} roomCode={id!} />
      ) : (
        <VStack
          p={10}
          bg={"gray.100"}
          align={"center"}
          justify="center"
          h={"100vh"}
        >
          <VStack w={"70%"} p={6} rounded="md">
            <Button onClick={start} alignSelf={"end"} colorScheme={"green"}>
              <Icon as={BsCheck} /> Start game
            </Button>
          </VStack>

          <HStack bg={"white"} w={"70%"} p={6} rounded="md">
            <HStack overflowX={"scroll"} flex={"1"}>
              <PlayerCardList />
            </HStack>
            <VStack p={6} pr={0}>
              <Text>{language.ui.lobby.players}</Text>
              <Text>
                {game.players.length} / {game.maximumPlayers}
              </Text>
            </VStack>
          </HStack>

          {game.authorizedPlayer?.isOwner && (
            <VStack bg={"white"} w={"70%"} p={6} rounded="md">
              <Text>{language.ui.lobby.roomOptions.title}</Text>
              <RoomOptions onSubmit={updateRoomOptions} />
            </VStack>
          )}
        </VStack>
      )}
    </>
  );
});

Lobby.displayName = "Lobby";
