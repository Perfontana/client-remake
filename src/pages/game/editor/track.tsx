import { HStack } from "@chakra-ui/react";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { editor } from "../../../store/editor";
import { Sample } from "../../../store/sample";
import { Track } from "../../../store/track";
import { pointFromPixelsToSeconds } from "../../../utils/transformCoordinates";
import { TRACK_HEIGHT } from "./editor-work-area";
import { TrackSamples } from "./track-samples";

export interface TrackElementProps {
  track: Track;
}

export const TrackElement = observer(({ track }: TrackElementProps) => {
  const [, dropContainer] = useDrop(
    {
      accept: ["sample", NativeTypes.FILE],
      hover(sample: Sample | null, monitor) {
        switch (monitor.getItemType()) {
          case "sample": {
            if (!sample || sample.track === track) return;
            runInAction(() => sample.connectToTrack(track));
            break;
          }
        }
      },
      drop(item: any, monitor) {
        let position = monitor.getClientOffset()?.x || 0;

        position = Math.max(
          pointFromPixelsToSeconds(
            position - editor.leftOffset,
            editor.width,
            editor.scale,
            editor.position
          ),
          0
        );

        switch (monitor.getItemType()) {
          case NativeTypes.FILE: {
            Sample.loadFromFile(item.files[0] as File, track, position);
            break;
          }
        }
      },
    },
    []
  );

  return (
    <HStack
      ref={dropContainer}
      spacing={0}
      key={track.id}
      position={"relative"}
      h={TRACK_HEIGHT}
      bg="gray.400"
      w={"full"}
      borderTopColor={"gray.300"}
      borderTopStyle="dotted"
      borderTopWidth={"1px"}
    >
      <TrackSamples track={track} />
    </HStack>
  );
});
