import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef } from "react";
import { editor } from "../../../../../store/editor";
import { Sample } from "../../../../../store/sample";
import waveforms from "../../../../../store/waveforms";
import { intervalFromSecondsToPixels } from "../../../../../utils/transformCoordinates";

export interface SampleWaveformProps {
  sample: Sample;
  color: string;
  containerWidth: number;
  containerScale: number;
}

export const SampleWaveform = observer(
  ({
    sample,
    color,
    containerWidth,
    containerScale = 1,
  }: SampleWaveformProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawWaveform = useCallback(() => {
      console.log({
        sample,
        canvas: canvasRef.current,
        width: intervalFromSecondsToPixels(
          sample.length / sample.speed,
          containerWidth,
          containerScale
        ),
        color,
        containerWidth,
        containerScale,
      });

      if (canvasRef.current) {
        waveforms.drawWaveform(
          sample,
          canvasRef.current,
          intervalFromSecondsToPixels(
            sample.length / sample.speed,
            containerWidth,
            containerScale
          ),
          color
        );
      }
    }, [
      sample.length,
      sample.speed,
      sample.offset,
      containerWidth,
      containerScale,
    ]);

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
  }
);
