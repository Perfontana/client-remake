import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { EditorHeader } from "./editor-header";
import { EditorWorkArea } from "./editor-timeline";

export const Editor = observer(() => {
  return (
    <Box>
      <EditorHeader />
      <EditorWorkArea />
    </Box>
  );
});
