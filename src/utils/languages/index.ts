import { englishTranslation } from "./english";
import { russianTranslation } from "./russian";

export enum Language {
  ENGLISH = "en",
  RUSSIAN = "ru",
}

export const supportedLanguages: string[] = Object.values(Language);

export const translations = {
  [Language.ENGLISH]: englishTranslation,
  [Language.RUSSIAN]: russianTranslation,
};

export interface UIText {
  mainPage: {
    createRoomBtn: string;
    usernamePlaceholder: string;
  };
  activeRoomNotice: {
    title: string;
    players: string;
    round: string;
    ended: string;
    notStarted: string;
    join: string;
    leave: string;
  };
  imageInput: {
    placeholder: string;
  };
  error: {
    roomCreaion: string;
  };
  validation: {
    tooShort: (min: number) => string;
    tooLong: (max: number) => string;
    tooSmall: (min: number) => string;
    tooBig: (max: number) => string;
    required: string;
  };
  lobby: {
    players: string;
    roomUpdateSuccess: string;
    roomUpdateFail: string;
    roomOptions: {
      title: string;
      roundTime: string;
      playerCount: string;
      save: string;
    };
    joinRoom: string;
    guide: string;
  };
  editor: {
    dropArea: {
      dropFile: string;
      click: string;
    };
    header: {
      play: string;
      pause: string;
      stop: string;
      startRecording: string;
      stopRecording: string;
      sendSong: string;
      mode: {
        drag: string;
        stretch: string;
        cut: string;
        delete: string;
      };
    };
    readyOverlay: {
      title: string;
    };
    trackOptions: {
      volume: string;
      pan: string;
      mute: string;
      solo: string;
      remove: string;
    };
    bottomMenu: {
      playerIsReady: string;
      freesound: {
        placeholder: string;
        tooltipText: string;
      };
      youtube: {
        placeholder: string;
        tooltipText: string;
      };
    };
  };
  guide: {
    label: string;
    header: string;
    playback: {
      header: string;
      text1: string;
      space: string;
      spaceDescription: string;
      wDescription: string;
      text2: string;
    };
    navigation: {
      header: string;
      wheelClickDrag: string;
      wheelClickDragDescription: string;
      wheel: string;
      wheelDescription: string;
    };
    samples: {
      header: string;
      addingSamples: {
        header: string;
        micro: string;
        microText: string;
        file: string;
        fileText: string;
        freesound: string;
        freesoundText: string;
        youtube: string;
        youtubeText: string;
        copy: string;
        copyText: string;
      };
      changingSamples: {
        header: string;
        cDescription: string;
        sDescription: string;
        dDescription: string;
        text1: string;
      };
    };
  };
}
