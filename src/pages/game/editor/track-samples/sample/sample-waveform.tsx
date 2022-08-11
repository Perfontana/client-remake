import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef } from "react";
import { editor } from "../../../../../store/editor";
import { Sample } from "../../../../../store/sample";
import waveforms from "../../../../../store/waveforms";
import { intervalFromSecondsToPixels } from "../../../../../utils/transformCoordinates";

export const SampleWaveform = observer(({ sample }: { sample: Sample }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWaveform = useCallback(() => {
    if (canvasRef.current) {
      waveforms.drawWaveform(
        sample,
        canvasRef.current,
        intervalFromSecondsToPixels(
          sample.length / sample.speed,
          editor.width,
          editor.scale
        )
      );
    }
  }, [sample.length, sample.speed, sample.offset, editor.width, editor.scale]);

  useEffect(drawWaveform, [drawWaveform]);

  return (
    <canvas
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
      className="sample-waveform"
      ref={canvasRef}
    ></canvas>
  );
});
