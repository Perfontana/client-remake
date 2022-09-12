import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { isErrorResponse } from "../../../api/config";
import { joinRoom } from "../../../api/rooms";
import { JoinRoomForm, PlayerData } from "../../../components/join-room-form";
import { auth } from "../../../store/auth";
import { language } from "../../../store/language";

export interface JoinRoomModalProps {
  roomCode: string;
  isOpen: boolean;
}

export const JoinRoomModal = observer(
  ({ roomCode, isOpen }: JoinRoomModalProps) => {
    const toast = useToast();

    const [isLoading, { on, off }] = useBoolean(false);

    const joinGame = async (player: PlayerData) => {
      on();

      const { data } = await joinRoom(roomCode, player);

      off();

      if (isErrorResponse(data)) {
        toast({
          title: data.error,
          description: data.message,
          status: "error",
        });

        return;
      }

      auth.setAuthData(data.token, roomCode, player.name);
    };

    return (
      <Modal isOpen={isOpen} onClose={() => {}} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <VStack align={"center"} justify="center">
            <ModalHeader>{language.ui.lobby.joinRoom}</ModalHeader>
            <JoinRoomForm
              isLoading={isLoading}
              onSubmit={joinGame}
              buttonText={language.ui.lobby.joinRoom}
            />
          </VStack>
        </ModalContent>
      </Modal>
    );
  }
);

JoinRoomModal.displayName = "JoinRoomModal";
