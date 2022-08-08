import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { EditorTrackOptions } from "./editor-track-options";
import { EditorTracks } from "./editor-tracks";

export const TRACK_HEIGHT = 50;

export const EditorWorkArea = observer(() => {
  return (
    <HStack align={"start"} spacing={0} justify={"start"}>
      <EditorTrackOptions />
      <EditorTracks />
    </HStack>
  );
});
