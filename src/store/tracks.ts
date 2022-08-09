import { makeAutoObservable } from "mobx";
import { Track } from "./track";

class Tracks {
  tracks: Track[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTrack() {
    const track = new Track();

    track.channel.toDestination();

    this.tracks.push(track);

    return track;
  }

  removeTrack(track: Track) {
    const samples = [...track.samples];

    samples.forEach((sample) => {
      sample.remove();
    });

    track.channel.dispose();

    this.tracks.splice(this.tracks.indexOf(track), 1);
  }

  clear() {
    this.tracks.forEach((track) => this.removeTrack(track));
  }
}

const tracks = new Tracks();

export default tracks;
