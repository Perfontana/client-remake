import { makeAutoObservable, runInAction } from "mobx";
import { Recorder, Transport, UserMedia } from "tone";
import tracks from "../store/tracks";
import { operationsStack } from "./operationsStack";
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

  set position(seconds: number) {
    Transport.seconds = seconds;
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

    runInAction(async () => {
      this.microphone?.close();

      this.isRecording = false;

      const track = tracks.addTrack();

      const sample = await Sample.loadFromFile(
        recording,
        track,
        this.startPosition
      );

      operationsStack.push(() => sample.remove());
    });
  }
}

export const sound = new Sound();
