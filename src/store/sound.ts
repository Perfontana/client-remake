import { makeAutoObservable, runInAction } from "mobx";
import { Recorder, Transport, UserMedia } from "tone";
import tracks from "../store/tracks";
import { Sample } from "./sample";

export class Sound {
  private microphone: UserMedia | null = null;
  private recorder: Recorder | null = null;
  private startPosition = 0;

  isPaused = true;
  isRecording = false;

  constructor() {
    makeAutoObservable(this);
  }

  play() {
    this.isPaused = false;
    Transport.start();
  }

  pause() {
    this.isPaused = true;
    Transport.pause();
  }

  stop() {
    this.isPaused = true;
    Transport.stop();
  }

  get position() {
    return Transport.seconds;
  }

  async startRecording() {
    this.microphone = new UserMedia();
    await this.microphone.open();

    runInAction(() => {
      this.recorder = new Recorder();
      this.microphone!.connect(this.recorder);

      this.startPosition = this.position;
      this.isRecording = true;

      this.recorder.start();
      this.play();
    });
  }

  async stopRecording() {
    this.pause();

    const recording = await this.recorder!.stop();

    runInAction(() => {
      this.microphone?.close();

      this.isRecording = false;

      Sample.loadFromFile(recording, tracks.tracks[0], this.startPosition);
    });
  }
}

export const sound = new Sound();
