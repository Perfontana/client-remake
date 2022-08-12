import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import { Channel } from "tone";
import { Sample } from "./sample";

export class Track {
  id = nanoid(10);
  channel = new Channel(0, 0);

  samples: Sample[] = [];
  volume: number = 0;
  pan: number = 0;
  solo: boolean = false;
  mute: boolean = false;

  isBlocked = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsBlocked(isBlocked: boolean) {
    this.isBlocked = isBlocked;
  }

  setVolume(value: number) {
    this.volume = value;
    this.channel.volume.value = value;
  }

  setPan(value: number) {
    this.pan = value;
    this.channel.pan.value = value;
  }

  setMute(value: boolean) {
    this.mute = value;
    this.channel.mute = value;
  }

  setSolo(value: boolean) {
    this.solo = value;
    this.channel.solo = value;
  }

  addSample(sample: Sample) {
    this.samples.push(sample);
  }

  removeSample(sample: Sample) {
    const sampleIndex = this.samples.indexOf(sample);
    if (sampleIndex >= 0) this.samples.splice(this.samples.indexOf(sample), 1);
  }
}
