import { VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import tracks from "../../../../store/tracks";
import { TIMELINE_HEIGHT } from "../timeline/editor-timeline";
import { EditorTrackOptions } from "./editor-track-options";

export const EditorTrackOptionsList = observer(() => {
  return (
    <VStack bg={"gray.600"} spacing={0} pt={TIMELINE_HEIGHT}>
      {tracks.tracks.map((track) => (
        <EditorTrackOptions key={track.id} track={track} />
      ))}
    </VStack>
  );
});
