import { Button, HStack, Icon, Tooltip, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { MdClose } from "react-icons/md";
import Knob from "../../../../components/knob";
import { language } from "../../../../store/language";
import { Track } from "../../../../store/track";
import tracks from "../../../../store/tracks";
import { TRACK_HEIGHT } from "../track-samples/editor-work-area";

export interface EditorTrackOptions {
  track: Track;
}

export const EditorTrackOptions = observer(({ track }: EditorTrackOptions) => {
  return (
    <HStack
      visibility={track.isBlocked ? "hidden" : "visible"}
      _notFirst={{ boxShadow: "0 0 5px #ffffff2c" }}
      pl={2}
      spacing={2}
      h={TRACK_HEIGHT}
    >
      <Tooltip label={language.ui.editor.trackOptions.remove}>
        <Button
          alignSelf={"start"}
          colorScheme={"red"}
          p={0}
          minW={0}
          w={`${TRACK_HEIGHT / 3}px`}
          h={`${TRACK_HEIGHT / 3}px`}
          fontSize={"10px"}
          onClick={() => {
            tracks.removeTrack(track);
          }}
        >
          <Icon as={MdClose} />
        </Button>
      </Tooltip>

      <VStack spacing={0}>
        <Tooltip hasArrow label={language.ui.editor.trackOptions.volume}>
          <span>
            <TrackVolumeControl track={track} />
          </span>
        </Tooltip>
      </VStack>

      <VStack spacing={0}>
        <Tooltip hasArrow label={language.ui.editor.trackOptions.pan}>
          <span>
            <TrackPanControl track={track} />
          </span>
        </Tooltip>
      </VStack>

      <VStack pl={2} pr={2} spacing={1} justify="center" align={"center"}>
        <Tooltip label={language.ui.editor.trackOptions.solo}>
          <Button
            p={0}
            minW={0}
            w={`${TRACK_HEIGHT / 3}px`}
            h={`${TRACK_HEIGHT / 3}px`}
            fontSize={"10px"}
            colorScheme={track.solo ? "yellow" : "gray"}
            onClick={() => track.setSolo(!track.solo)}
          >
            S
          </Button>
        </Tooltip>

        <Tooltip label={language.ui.editor.trackOptions.mute}>
          <Button
            p={0}
            minW={0}
            w={`${TRACK_HEIGHT / 3}px`}
            h={`${TRACK_HEIGHT / 3}px`}
            fontSize={"10px"}
            style={
              track.mute
                ? {
                    backgroundColor: "red",
                  }
                : {}
            }
            onClick={() => track.setMute(!track.mute)}
          >
            M
          </Button>
        </Tooltip>
      </VStack>
    </HStack>
  );
});

const TrackVolumeControl = observer(({ track }: { track: Track }) => {
  return (
    <Knob
      size={20}
      value={track.volume}
      onChange={(value) => {
        track.setVolume(value);
      }}
      min={-50}
      max={20}
    />
  );
});

const TrackPanControl = observer(({ track }: { track: Track }) => {
  return (
    <Knob
      size={20}
      value={track.pan}
      onChange={(value) => {
        track.setPan(value);
      }}
      min={-1}
      max={1}
    />
  );
});
