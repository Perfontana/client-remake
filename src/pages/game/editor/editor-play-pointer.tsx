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
      left={`${editor.playPositionPixels}px`}
    >
      <div
        style={{
          width: "0",
          height: "0",
          borderStyle: "solid",
          borderWidth: "6px 6px 0 6px",
          transform: "translate(-50%, 0)",
          borderColor: "#ffffff transparent transparent transparent",
        }}
      ></div>
    </Box>
  );
});
