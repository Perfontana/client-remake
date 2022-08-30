import { SCALE_1_SECONDS } from "../pages/game/editor/track-samples/editor-tracks";

export const pointFromPixelsToSeconds = (
  pixels: number,
  width: number,
  scale: number,
  position: number,
  dutation: number = SCALE_1_SECONDS
) => {
  const positionSeconds = (Math.floor(position) / width) * dutation * scale;

  const seconds = (pixels / width) * dutation * scale + positionSeconds;

  return seconds;
};

export const intervalFromPixelsToSeconds = (
  pixels: number,
  width: number,
  scale: number
) => {
  const seconds = (pixels / width) * SCALE_1_SECONDS * scale;

  return seconds;
};

export const pointFromSecondsToPixels = (
  seconds: number,
  width: number,
  scale: number,
  position: number
) => {
  const pixels =
    (seconds / (SCALE_1_SECONDS * scale)) * width - Math.floor(position);

  return pixels;
};

export const intervalFromSecondsToPixels = (
  seconds: number,
  width: number,
  scale: number
) => {
  const pixels = (seconds / (SCALE_1_SECONDS * scale)) * width;

  return pixels;
};
