import { makeAutoObservable } from "mobx";
import { SCALE_1_SECONDS } from "../pages/game/editor/editor-tracks";

class Mark {
  value: number = 0;
  position: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setValue(newValue: number) {
    this.value = newValue;
  }

  setPosition(newPosition: number) {
    this.position = newPosition;
  }
}

class Marks {
  markTimeSpacing = 5;

  marks: Mark[] = [];

  width: number = 0;
  widthSeconds: number = 0;

  scale: number = 1;

  position: number = 0;
  positionSeconds: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setWidth(newWidth: number) {
    this.width = newWidth;
    if (this.position)
      this.positionSeconds = (this.position / this.width) * this.widthSeconds;
  }

  setScale(newScale: number) {
    this.scale = newScale;
    this.widthSeconds = SCALE_1_SECONDS * this.scale;
  }

  setPosition(newPosition: number) {
    this.position = newPosition;
    if (this.width)
      this.positionSeconds = (this.position / this.width) * this.widthSeconds;
  }

  createMarks() {
    const newMarksCount =
      Math.ceil(this.widthSeconds / this.markTimeSpacing) + 1;

    if (newMarksCount > this.marks.length)
      this.addNewMarks(newMarksCount - this.marks.length);
    if (newMarksCount < this.marks.length)
      this.removeMarks(this.marks.length - newMarksCount);

    this.updateMarks();
  }

  addNewMarks(count: number) {
    for (let i = 0; i < count; i++) this.marks.push(new Mark());
  }

  removeMarks(count: number) {
    for (let i = 0; i < count; i++) this.marks.pop();
  }

  updateMarks() {
    let outOfBoundsMarks = Math.ceil(
      this.positionSeconds / this.markTimeSpacing
    );

    this.marks.forEach((mark, index) => {
      const newValue = (index + outOfBoundsMarks) * this.markTimeSpacing;

      mark.setValue(newValue);
      mark.setPosition(
        (newValue / this.widthSeconds) * this.width - this.position
      );
    });
  }
}

export const marks = new Marks();
