import {
  Button,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import {
  BsPlay,
  BsPause,
  BsStop,
  BsMic,
  BsArrowRight,
  BsMicMute,
} from "react-icons/bs";
import * as Tone from "tone";
import { isErrorResponse } from "../../../../api/config";
import { sendSong } from "../../../../api/rooms";
import game from "../../../../store/game";
import { language } from "../../../../store/language";
import { sound } from "../../../../store/sound";
import { renderAudio } from "../../../../utils/renderAudio";
import { EditorModeSwitch } from "./editor-mode-switch";

export const EditorHeader = observer(() => {
  const toast = useToast();

  const sendRoundSong = useCallback(async () => {
    const songData = await renderAudio();

    const { data } = await sendSong(songData);

    if (isErrorResponse(data)) {
      console.error("Can not send a song!", data);
      return;
    }

    game.set({ isPlayerReady: true });
  }, []);

  const onPlayPauseClick = () => {
    if (sound.isPaused) {
      Tone.start();
      sound.play();
      return;
    }

    sound.pause();
  };

  return (
    <HStack p={6} justify="space-between">
      <HStack>
        <Tooltip
          label={
            sound.isPaused
              ? language.ui.editor.header.play
              : language.ui.editor.header.pause
          }
        >
          <IconButton
            disabled={sound.isRecording}
            aria-label={language.ui.editor.header.play}
            icon={sound.isPaused ? <BsPlay /> : <BsPause />}
            onClick={onPlayPauseClick}
          />
        </Tooltip>

        <Tooltip label={language.ui.editor.header.stop}>
          <IconButton
            disabled={sound.isRecording}
            aria-label={language.ui.editor.header.stop}
            icon={<BsStop />}
            onClick={sound.stop.bind(sound)}
          />
        </Tooltip>

        <Tooltip
          label={
            sound.isRecording
              ? language.ui.editor.header.stopRecording
              : language.ui.editor.header.startRecording
          }
        >
          <IconButton
            aria-label={language.ui.editor.header.startRecording}
            icon={sound.isRecording ? <BsMicMute /> : <BsMic />}
            onClick={async (e) => {
              await Tone.start();

              if (!sound.isRecording) {
                try {
                  await sound.startRecording();
                } catch (error: any) {
                  toast({ status: "error", title: error.message });
                }
                return;
              }

              await sound.stopRecording();
            }}
          />
        </Tooltip>
      </HStack>
      <EditorModeSwitch />

      <Text>{game.timeLeft}s</Text>

      <Button onClick={sendRoundSong}>
        {language.ui.editor.header.sendSong} <Icon ml={2} as={BsArrowRight} />
      </Button>
    </HStack>
  );
});
