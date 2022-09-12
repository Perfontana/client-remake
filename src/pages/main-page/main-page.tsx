import { Flex, useBoolean, useToast } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { isErrorResponse } from "../../api/config";
import { createRoom, joinRoom } from "../../api/rooms";
import { JoinRoomForm } from "../../components/join-room-form";
import { auth } from "../../store/auth";
import { language } from "../../store/language";
import { ActiveRoomNotice } from "./active-room-notice";

export const MainPage = observer(() => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, { on: setLoadingStarted, off: setLoadingEnded }] =
    useBoolean(false);

  const onSubmit = async (player: { name: string; avatar: File | any }) => {
    setLoadingStarted();

    const roomResponse = await createRoom({});

    const { data } = isErrorResponse(roomResponse.data)
      ? roomResponse
      : await joinRoom(roomResponse.data.code, player);

    setLoadingEnded();

    if (isErrorResponse(data)) {
      toast({
        isClosable: true,
        title: data.error,
        description: data.message,
        status: "error",
      });

      return;
    }

    const token = data.token;
    const code = (roomResponse.data as any).code;

    auth.setAuthData(token, code, player.name);

    navigate(`/room/${code}`);
  };

  return (
    <Flex
      bg="gray.100"
      align="center"
      justify="center"
      h="100vh"
      direction={{ base: "column", md: "row" }}
    >
      <Flex align="center" justify="center" h="full" flex={1}>
        <JoinRoomForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          buttonText={language.ui.mainPage.createRoomBtn}
        />
      </Flex>
      {auth.token && (
        <Flex align="center" justify="center" h="full" flex={1}>
          <ActiveRoomNotice />
        </Flex>
      )}
    </Flex>
  );
});
