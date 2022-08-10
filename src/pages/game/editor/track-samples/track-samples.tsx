import { observer } from "mobx-react-lite";
import { Track } from "../../../../store/track";
import { SampleElement } from "./sample/sample-element";

export const TrackSamples = observer(({ track }: { track: Track }) => {
  return (
    <>
      {track.samples.map((sample) => (
        <SampleElement key={sample.id} sample={sample} />
      ))}
    </>
  );
});
