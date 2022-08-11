import { Box, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { KeyboardEvent, useEffect } from "react";
import { Transport } from "tone";
import * as Tone from "tone";
import { editor, EditorMode } from "../../../store/editor";
import { operationsStack } from "../../../store/operationsStack";
import { sound } from "../../../store/sound";
import { EditorDropArea } from "./editor-drop-area";
import { EditorHeader } from "./header/editor-header";
import { EditorWorkArea } from "./track-samples/editor-work-area";
import { useHotkeys } from "react-hotkeys-hook";
import { useEditorModeHotkey } from "../../../utils/useEditorModeHotkey";
import game from "../../../store/game";
import { getCurrentTime } from "../../../api/rooms";

export const Editor = observer(() => {
  useEffect(() => {
    const interval = setInterval(() => {
      editor.set({ playPosition: Transport.seconds });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const onNewRound = async () => {
    game.loadRoundSong();
    const { data } = await getCurrentTime();
    game.startTimer(data.time);
  };

  useEffect(() => {
    onNewRound();
  }, [game.currentRound]);

  useEditorModeHotkey("esc", EditorMode.None);
  useEditorModeHotkey("c", EditorMode.Cut);
  useEditorModeHotkey("s", EditorMode.Stretch);
  useEditorModeHotkey("d", EditorMode.Delete);

  useHotkeys(
    " ",
    () => {
      Tone.start();
      sound.isPaused ? sound.play() : sound.pause();
    },
    []
  );

  return (
    <VStack minHeight={"100vh"} spacing={0} align={"stretch"} justify={"start"}>
      <EditorHeader />
      <EditorWorkArea />
      <EditorDropArea />
    </VStack>
  );
});
