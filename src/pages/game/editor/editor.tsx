import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Transport } from "tone";
import { editor } from "../../../store/editor";
import { EditorHeader } from "./editor-header";
import { EditorWorkArea } from "./editor-work-area";

export const Editor = observer(() => {
  useEffect(() => {
    const interval = setInterval(() => {
      editor.set({ playPosition: Transport.seconds });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <EditorHeader />
      <EditorWorkArea />
    </Box>
  );
});
