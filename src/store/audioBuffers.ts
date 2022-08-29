import { makeAutoObservable } from "mobx";
import { ToneAudioBuffer } from "tone";

export interface BufferInfo {
  buffer: ToneAudioBuffer;
  name: string;
  url: string;
}

export class AudioBuffers {
  private _buffers: BufferInfo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addBuffer(buffer: ToneAudioBuffer, name: string, url?: string) {
    this._buffers.push({ buffer, name, url: url || "" });
  }

  getBuffer(
    name: string,
    url?: string
  ): Promise<ToneAudioBuffer | null | undefined> {
    return new Promise((resolve) => {
      let foundBuffer = this._buffers.find(
        (bufferInfo) => bufferInfo.name === name
      );

      if (foundBuffer) {
        if (!foundBuffer.buffer.loaded) {
          foundBuffer.buffer.onload = resolve;
          return;
        }

        resolve(foundBuffer.buffer);
        return;
      }

      if (!url) {
        resolve(null);
        return;
      }

      const audioBuffer = new ToneAudioBuffer(
        url,
        (buffer: ToneAudioBuffer | undefined) => {
          resolve(buffer);
        }
      );

      foundBuffer = { buffer: audioBuffer, name, url };
      this._buffers.push(foundBuffer);
    });
  }
}

export const audioBuffers = new AudioBuffers();
