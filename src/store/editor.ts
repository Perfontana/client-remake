import { makeAutoObservable } from "mobx";
import { SCALE_1_SECONDS } from "../pages/game/editor/editor-tracks";
import { pointFromSecondsToPixels } from "../utils/transformCoordinates";

export enum EditorMode {
  None = "none",
  Cut = "cut",
  Stretch = "stretch",
}

export class EditorStore {
  leftOffset: number = 0;

  width: number = 0;
  position: number = 0;
  scale: number = 1;
  playPosition: number = 0;

  mode: EditorMode = EditorMode.None;

  constructor() {
    makeAutoObservable(this);
  }

  get timeWidth() {
    return SCALE_1_SECONDS * this.scale;
  }

  get timePosition() {
    return (this.position / this.width) * this.timeWidth;
  }

  get playPositionPixels() {
    return pointFromSecondsToPixels(
      this.playPosition,
      this.width,
      this.scale,
      this.position
    );
  }

  set(
    values: Pick<
      Partial<EditorStore>,
      "width" | "position" | "scale" | "leftOffset" | "playPosition" | "mode"
    >
  ) {
    Object.assign(this, values);
  }
}

export const editor = new EditorStore();
