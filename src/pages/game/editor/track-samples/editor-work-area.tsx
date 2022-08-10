import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import tracks from "../../../../store/tracks";
import { EditorTrackOptionsList } from "../track-options/editor-track-options-list";
import { EditorTracks } from "./editor-tracks";

export const TRACK_HEIGHT = 50;

export const EditorWorkArea = observer(() => {
  return tracks.tracks.length ? (
    <HStack align={"start"} spacing={0} justify={"start"}>
      <EditorTrackOptionsList />
      <EditorTracks />
    </HStack>
  ) : null;
});
