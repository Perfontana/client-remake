import { SCALE_1_SECONDS } from "../pages/game/editor/editor-tracks";

export const pointFromPixelsToSeconds = (
  pixels: number,
  width: number,
  scale: number,
  position: number
) => {
  const positionSeconds = (position / width) * SCALE_1_SECONDS * scale;

  const seconds = (pixels / width) * SCALE_1_SECONDS * scale + positionSeconds;

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
  const pixels = (seconds / (SCALE_1_SECONDS * scale)) * width - position;

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
