import {
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { audioUploader, AudioUploadStatus } from "../../../store/audioUploader";

export const EditorUploadOverlay = observer(() => {
  let modalBody;

  switch (audioUploader.status) {
    case AudioUploadStatus.RENDERING: {
      modalBody = <Text textAlign={"center"}>Rendering your track...</Text>;
      break;
    }
    case AudioUploadStatus.UPLOADING: {
      modalBody = (
        <VStack align={"center"} justify="center">
          <Text textAlign={"center"}>Uploading</Text>
          <CircularProgress value={audioUploader.uploadProgress} />
        </VStack>
      );
      break;
    }
  }

  return (
    <Modal
      isOpen={audioUploader.status !== AudioUploadStatus.NONE}
      onClose={() => {}}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>{modalBody}</ModalBody>
      </ModalContent>
    </Modal>
  );
});
