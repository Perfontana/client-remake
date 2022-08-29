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
    };
  };
}
