import { Button, HStack, Icon, IconButton } from "@chakra-ui/react";
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
import { sound } from "../../../store/sound";

export const EditorHeader = observer(() => {
  const onPlayPauseClick = () => {
    if (sound.isPaused) {
      console.log("adsadsadasgw");
      Tone.start();
      sound.play();
      return;
    }

    sound.pause();
  };

  return (
    <HStack p={6} justify="space-between">
      <HStack>
        <IconButton
          aria-label="Play"
          icon={sound.isPaused ? <BsPlay /> : <BsPause />}
          onClick={onPlayPauseClick}
        />
        <IconButton
          aria-label="Stop"
          icon={<BsStop />}
          onClick={sound.stop.bind(sound)}
        />
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
      </HStack>
      <Button>
        Send song <Icon ml={2} as={BsArrowRight} />
      </Button>
    </HStack>
  );
});
