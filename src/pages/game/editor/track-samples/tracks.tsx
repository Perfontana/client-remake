import { observer } from "mobx-react-lite";
import tracks from "../../../../store/tracks";
import { TrackElement } from "./track-element";

export const TrackList = observer(() => {
  return (
    <>
      {tracks.tracks.map((track) => (
        <TrackElement key={track.id} track={track} />
      ))}
    </>
  );
});
