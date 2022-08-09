import { Box, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { KeyboardEvent, useEffect } from "react";
import { Transport } from "tone";
import * as Tone from "tone";
import { editor, EditorMode } from "../../../store/editor";
import { operationsStack } from "../../../store/operationsStack";
import { sound } from "../../../store/sound";
import { EditorDropArea } from "./editor-drop-area";
import { EditorHeader } from "./editor-header";
import { EditorWorkArea } from "./editor-work-area";

const undoKey = "KeyZ";
const cutKey = "KeyC";
const stretchKey = "KeyS";
const playPauseKey = "Space";

export const Editor = observer(() => {
  useEffect(() => {
    const interval = setInterval(() => {
      editor.set({ playPosition: Transport.seconds });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const onKeydown = (e: KeyboardEvent) => {
    if (e.code === undoKey) {
      if (e.ctrlKey) {
        operationsStack.undo();
      }
    }

    if (e.code === cutKey) {
      editor.set({ mode: EditorMode.Cut });
    }

    if (e.code === playPauseKey) {
      Tone.start();
      sound.isPaused ? sound.play() : sound.pause();
    }

    if (e.code === stretchKey) {
      editor.set({ mode: EditorMode.Stretch });
    }
  };

  const onKeyup = (e: KeyboardEvent) => {
    if (e.code === cutKey) {
      editor.set({ mode: EditorMode.None });
    }

    if (e.code === stretchKey) {
      editor.set({ mode: EditorMode.None });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    return () => {
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("keyup", onKeyup);
    };
  }, [onKeydown]);
  return (
    <VStack minHeight={"100vh"} spacing={0} align={"stretch"} justify={"start"}>
      <EditorHeader />
      <EditorWorkArea />
      <EditorDropArea />
    </VStack>
  );
});
