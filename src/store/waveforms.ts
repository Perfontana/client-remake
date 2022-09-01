import drawSoundWave from "../utils/drawSoundWave";
import { Sample } from "./sample";

class Waveforms {
  waveforms: Record<string, string> = {};

  drawWaveform(
    sample: Sample,
    canvas: HTMLCanvasElement,
    width: number = canvas.width,
    color: string = "teal"
  ) {
    let waveform = this.waveforms[sample.name];

    if (!waveform) {
      drawSoundWave(sample.player.buffer, canvas, color);
      this.waveforms[sample.name] = canvas.toDataURL("png", 1);
    }

    waveform = this.waveforms[sample.name];

    const image = new Image();
    image.src = waveform;

    image.onload = () => {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Need this because sometimes canvas.width doesn't match the real size on screen
        // canvas.width = width;
        ctx.clearRect(0, 0, width, canvas.height);
        ctx.drawImage(
          image,
          (sample.offset / sample.fullLength) * image.width,
          0,
          (sample.length / sample.fullLength) * image.width,
          canvas.height,
          0,
          0,
          width,
          canvas.height
        );
      }
    };
  }

  deleteWaveform(sample: Sample) {
    this.waveforms[sample.id] = "";
  }

  clear() {
    this.waveforms = {};
  }
}

const waveforms = new Waveforms();

export default waveforms;
