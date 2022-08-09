import { HStack, Button, Icon, Text, VStack, Tooltip } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { MdClose } from "react-icons/md";
import Knob from "../../../components/knob";
import { operationsStack } from "../../../store/operationsStack";
import { Track } from "../../../store/track";
import tracks from "../../../store/tracks";
import { TIMELINE_HEIGHT } from "./editor-timeline";
import { TRACK_HEIGHT } from "./editor-work-area";

export interface EditorTrackOptions {
  track: Track;
}

export const EditorTrackOptions = observer(({ track }: EditorTrackOptions) => {
  return (
    <HStack pl={2} spacing={2} h={TRACK_HEIGHT}>
      <VStack spacing={0}>
        <Tooltip hasArrow label={"Volume"}>
          <span>
            <Knob
              size={20}
              value={track.volume}
              onChange={(value) => {
                track.setVolume(value);
              }}
              min={-50}
              max={20}
            />
          </span>
        </Tooltip>
      </VStack>

      <VStack spacing={0}>
        <Tooltip hasArrow label={"Pan"}>
          <span>
            <Knob
              size={20}
              value={track.pan}
              onChange={(value) => {
                track.setPan(value);
              }}
              min={-1}
              max={1}
            />
          </span>
        </Tooltip>
      </VStack>

      <VStack pl={2} pr={2} spacing={0} justify="center" align={"center"}>
        <Button
          p={0}
          minW={0}
          w={`${TRACK_HEIGHT / 3}px`}
          h={`${TRACK_HEIGHT / 3}px`}
          title="Remove track"
          fontSize={"10px"}
          onClick={() => {
            tracks.removeTrack(track);
          }}
        >
          <Icon as={MdClose} />
        </Button>

        <Button
          p={0}
          minW={0}
          w={`${TRACK_HEIGHT / 3}px`}
          h={`${TRACK_HEIGHT / 3}px`}
          title="Toggle solo"
          fontSize={"10px"}
          style={
            track.solo
              ? {
                  backgroundColor: "yellow",
                }
              : {}
          }
          onClick={() => track.setSolo(!track.solo)}
        >
          S
        </Button>

        <Button
          p={0}
          minW={0}
          w={`${TRACK_HEIGHT / 3}px`}
          h={`${TRACK_HEIGHT / 3}px`}
          title="Mute track"
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
      </VStack>
    </HStack>
  );
});
