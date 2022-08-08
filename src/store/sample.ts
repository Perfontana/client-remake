import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import { Channel, Player, Time, ToneAudioBuffer, ToneAudioNode } from "tone";
import decodeArrayBuffer from "../utils/decodeArrayBuffer";
import loadFile from "../utils/loadFile";
import { audioBuffers } from "./audioBuffers";
import { Track } from "./track";

export class Sample {
  id = nanoid(10);
  player: Player;
  public track: Track;
  public loaded = false;
  public name!: string;
  public position: number = 0;
  public offset: number = 0;
  public speed = 1;
  public length: number;
  public fullLength: number;
  public effectsChain: ToneAudioNode[];

  constructor(
    buffer: ToneAudioBuffer,
    track: Track,
    name: string,
    position: number = 0,
    offset: number = 0,
    length?: number
  ) {
    this.player = new Player();
    this.player.buffer = buffer;
    this.player.sync().start(position, offset, length);

    this.effectsChain = [this.player];

    this.connectChannel(track.channel);

    this.track = track;
    this.name = name;
    this.position = position;
    this.offset = offset;
    this.fullLength = buffer.duration;
    this.length = length ?? this.fullLength - Time(offset).toSeconds();

    makeAutoObservable(this);
  }

  get channel(): Channel {
    return this.track.channel;
  }

  public set(options: {
    position?: number;
    offset?: number;
    length?: number;
    speed?: number;
  }) {
    this.position = options.position ?? this.position;
    this.offset = options.offset ?? this.offset;
    this.length = options.length ?? this.length;

    this.player.unsync().sync().start(this.position, this.offset, this.length);
    this.player.playbackRate = options.speed || 1;
  }

  copy(): Sample {
    return new Sample(
      this.player.buffer,
      this.track,
      this.name,
      this.position,
      this.offset,
      this.length
    );
  }

  get lastEffect(): ToneAudioNode {
    return this.effectsChain[this.effectsChain.length - 1];
  }

  pushEffect(effect: ToneAudioNode) {
    this.insertEffectAfter(
      effect,
      this.effectsChain[this.effectsChain.length - 2]
    );
  }

  removeChannel() {
    this.lastEffect.disconnect(this.channel);
  }

  connectChannel(channel: Channel) {
    this.lastEffect.connect(channel);
  }

  connectToTrack(track: Track) {
    this.removeChannel();
    this.track.removeSample(this);

    track.addSample(this);
    this.connectChannel(track.channel);
    this.track = track;
  }

  unshiftEffect(effect: ToneAudioNode) {
    this.insertEffectAfter(effect);
  }

  insertEffectAfter(
    effectToInsert: ToneAudioNode,
    effectBefore?: ToneAudioNode
  ) {
    if (!effectBefore) effectBefore = this.player;

    const effectIndex = this.effectsChain.indexOf(effectBefore);

    if (effectIndex < 0) return;

    // Changing destinations from
    // effectBefore -> destination
    // to
    // effectBefore -> effectToInsert -> destination
    const effectBeforeDestination = effectBefore.context.destination;
    effectBefore.disconnect(effectBeforeDestination);
    effectBefore.connect(effectToInsert);
    effectToInsert.connect(effectBeforeDestination);

    this.effectsChain.splice(effectIndex + 1, 0, effectToInsert);
  }

  removeEffect(effect: ToneAudioNode) {
    const effectIndex = this.effectsChain.indexOf(effect);

    if (effectIndex < 0) return;

    const effectBefore = this.effectsChain[effectIndex - 1];
    const effectAfter =
      effectIndex < this.effectsChain.length - 1
        ? this.effectsChain[effectIndex + 1]
        : this.player.context.destination;

    // Changing
    // effectBefore -> effect -> effectAfter
    // to
    // effectBefore -> effectAfter
    effectBefore.disconnect(effect);
    effectBefore.connect(effectAfter);

    effect.disconnect(effectAfter);

    this.effectsChain.splice(effectIndex, 1);
  }

  cut(cutPosition: number) {
    const copy = this.copy();

    this.track.addSample(copy);

    const cutSampleLength = cutPosition - this.position;

    this.set({ length: cutSampleLength });
    copy.set({
      position: cutPosition,
      offset: copy.offset + cutSampleLength,
      length: copy.length - cutSampleLength,
    });

    return copy;
  }

  remove() {
    this.player.unsync();
    this.player.dispose();
    // waveforms.deleteWaveform(this);
    this.track.removeSample(this);
  }

  static async loadFromUrl(
    name: string,
    url: string,
    track: Track,
    position = 0
  ) {
    const buffer = await audioBuffers.getBuffer(name, url);
    if (!buffer) return;

    const newSample = new Sample(buffer, track, name, position);

    track.addSample(newSample);
    newSample.loaded = true;

    return newSample;
  }

  static async loadFromFile(file: File | Blob, track: Track, position = 0) {
    const name = (file as any).name
      ? (file as any).name
      : `Recording ${Date.now()}`;

    let buffer = await audioBuffers.getBuffer(name);

    if (!buffer) {
      const arrayBuffer = (await loadFile(file)) as ArrayBuffer;
      const audioBuffer = await decodeArrayBuffer(arrayBuffer);

      audioBuffers.addBuffer(audioBuffer, name);

      buffer = audioBuffer;
    }

    const newSample = new Sample(
      buffer as ToneAudioBuffer,
      track,
      name,
      position
    );

    track.addSample(newSample);
    newSample.loaded = true;

    return newSample;
  }
}
