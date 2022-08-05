import { UIText } from ".";

export const englishTranslation: UIText = {
  mainPage: {
    createRoomBtn: "Create room",
    usernamePlaceholder: "Player name",
  },
  activeRoomNotice: {
    title: "Your last game",
    players: "Players",
    round: "Round",
    ended: "Game ended",
    notStarted: "Not started",
    join: "Join",
    leave: "Leave",
  },
  imageInput: {
    placeholder: "Select an avatar",
  },
  error: {
    roomCreaion: "Can't create a room",
  },
  validation: {
    required: "Required",
    tooShort: (min: number) => `Should be at least ${min} charactest long`,
    tooLong: (max: number) => `Should not be longer than ${max} characters`,
    tooSmall: (min: number) => `Should be bigger than ${min}`,
    tooBig: (max: number) => `Should be smaller than ${max}`,
  },
  lobby: {
    players: "Players",
    roomUpdateSuccess: "Updated room options",
    roomUpdateFail: "Room options update failed",
    roomOptions: {
      title: "Room options",
      playerCount: "Number of players",
      roundTime: "Round time in seconds",
      save: "Save",
    },
  },
};
