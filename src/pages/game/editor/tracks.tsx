import { HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import tracks from "../../../store/tracks";
import { TRACK_HEIGHT } from "./editor-work-area";
import { TrackElement } from "./track";
import { TrackSamples } from "./track-samples";

export const Tracks = observer(() => {
  return (
    <>
      {tracks.tracks.map((track) => (
        <TrackElement key={track.id} track={track} />
      ))}
    </>
  );
});
