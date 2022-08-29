import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import game from "../../../store/game";
import { language } from "../../../store/language";

export const EditorReadyOverlay = observer(() => {
  return (
    <Modal isOpen={game.isPlayerReady} onClose={() => {}} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textAlign={"center"}>
            {language.ui.editor.readyOverlay.title}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
