import { Button, HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import {
  BsPlay,
  BsPause,
  BsStop,
  BsMic,
  BsArrowRight,
  BsMicMute,
} from "react-icons/bs";
import * as Tone from "tone";
import { language } from "../../../store/language";
import { sound } from "../../../store/sound";

export const EditorHeader = observer(() => {
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
            aria-label="Stop"
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
            aria-label="Start recording"
            icon={sound.isRecording ? <BsMicMute /> : <BsMic />}
            onClick={async (e) => {
              // have to call it in event handler
              await Tone.start();

              if (!sound.isRecording) {
                await sound.startRecording();
                return;
              }

              await sound.stopRecording();
            }}
          />
        </Tooltip>
      </HStack>
      <Button>
        Send song <Icon ml={2} as={BsArrowRight} />
      </Button>
    </HStack>
  );
});
