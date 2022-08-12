import { VStack } from "@chakra-ui/react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import * as Tone from "tone";
import { Transport } from "tone";
import { isErrorResponse } from "../../../api/config";
import { getCurrentTime, getSong } from "../../../api/rooms";
import { useSocketHandlers } from "../../../socket/use-socket-handlers";
import { editor, EditorMode } from "../../../store/editor";
import game from "../../../store/game";
import { Sample } from "../../../store/sample";
import { socketStore } from "../../../store/socket";
import { sound } from "../../../store/sound";
import tracks from "../../../store/tracks";
import { useEditorModeHotkey } from "../../../utils/useEditorModeHotkey";
import { BottomMenu } from "./bottom-menu/bottom-menu";
import { EditorDropArea } from "./editor-drop-area";
import { EditorHeader } from "./header/editor-header";
import { EditorWorkArea } from "./track-samples/editor-work-area";

export const Editor = observer(() => {
  useEffect(() => {
    const interval = setInterval(() => {
      editor.set({ playPosition: Transport.seconds });
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const onRoundStarted = async () => {
    const { data: response } = await getSong();

    if (isErrorResponse(response)) {
      return;
    }

    if (response.url === "FIRST_ROUND") return;

    tracks.clear();

    const track = tracks.addTrack();
    track.setIsBlocked(true);

    await Sample.loadFromUrl(response.url, response.url, track);
    const { data } = await getCurrentTime();
    game.startTimer(data.time);
  };

  useEffect(() => {
    onRoundStarted();

    () => {
      tracks.clear();
    };
  }, []);

  // console.log(toJS(tracks.tracks));

  useSocketHandlers({
    io: socketStore.io,
    handlers: {
      onRoundStarted,
    },
  });

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
      <BottomMenu />
    </VStack>
  );
});
