import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { editor } from "../../../store/editor";

export const EditorPlayPointer = observer(() => {
  return (
    <Box
      w={"1px"}
      bg="white"
      h={"full"}
      position="absolute"
      zIndex={10}
      left={editor.playPositionPixels + editor.leftOffset}
    ></Box>
  );
});
