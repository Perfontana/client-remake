import { makeAutoObservable } from "mobx";
import { sendSong } from "../api/rooms";
import { renderAudio } from "../utils/renderAudio";

export enum AudioUploadStatus {
  NONE = "NONE",
  UPLOADING = "UPLOADING",
  RENDERING = "RENDERING",
}

class AudioUploaderState {
  status: AudioUploadStatus = AudioUploadStatus.NONE;
  uploadProgress: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  private onUploadProgress(progress: ProgressEvent) {
    this.setProgress((progress.loaded * 100) / progress.total);
  }

  private setProgress(value: number) {
    this.uploadProgress = value;
  }

  private setStatus(value: AudioUploadStatus) {
    this.status = value;
  }

  async uploadSong() {
    if (this.status !== AudioUploadStatus.NONE) return;

    this.setStatus(AudioUploadStatus.RENDERING);
    const audioData = await renderAudio();

    this.setStatus(AudioUploadStatus.UPLOADING);
    const res = await sendSong(audioData, this.onUploadProgress.bind(this));

    this.setStatus(AudioUploadStatus.NONE);
    this.setProgress(0);

    return res;
  }
}

export const audioUploader = new AudioUploaderState();
