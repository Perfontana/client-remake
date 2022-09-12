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
    joinRoom: "Join game",
    guide: "How to play",
  },
  editor: {
    dropArea: {
      dropFile: "Drop file here!",
      click: "Or click to add a new track",
    },
    header: {
      play: "Play",
      pause: "Pause",
      stop: "Stop",
      startRecording: "Start recording",
      stopRecording: "Stop recording",
      sendSong: "Send song",
      mode: {
        drag: "Drag mode",
        stretch: "Stretch mode (hold S to use)",
        cut: "Cut mode (hold C to use)",
        delete: "Delete mode (hold D to use)",
      },
    },
    readyOverlay: {
      title: `You've sent your song. Now waiting for other players...`,
    },
    trackOptions: {
      mute: "Mute track",
      pan: "Pan",
      remove: "Remove track",
      solo: "Toggle solo mode",
      volume: "Volume",
    },
    bottomMenu: {
      playerIsReady: "is ready",
    },
  },
  guide: {
    label: "User guide",
    header: "User guide",
    playback: {
      header: "Controlling playback",
      text1:
        "Playback can be controlled with buttons on the top-left corner of the screen. You can also use shortcuts:",
      space: "space",
      spaceDescription: "to resume or pause",
      wDescription: "to move pointer to the start",
      text2:
        "You can also change pointer position by clicking on tracks or timeline",
    },
    navigation: {
      header: "Editor navigation",
      wheelClickDrag: "mouse wheel click and drag",
      wheelClickDragDescription: "to change position",
      wheel: "mouse wheel",
      wheelDescription: "to change scale",
    },
    samples: {
      header: "Samples",
      addingSamples: {
        header: "Adding samples",
        micro: "Record microphone",
        microText:
          "Use button on the top-left corner to start recording. Click the same button to stop. New sample will be saved on the new track.",
        file: "Files",
        fileText: "Simply drag and drop mp3 or wave file on editor track.",
        freesound: "Freesound.org",
        freesoundText:
          "You can find samples on freesound.org using a button on the bottom-right corner. Drag liked sample on the track.",
        youtube: "Youtube",
        youtubeText:
          "You can load video's mp3 to your track using a button on the bottom-right corner. Paste video URL or video id and press enter. Video should not be longer than 10 minutes. Some videos might not be accessible.",
        copy: "Creating a copy",
        copyText:
          "You can copy existing sample by holding Alt / Option and dragging a sample",
      },
      changingSamples: {
        header: "Changing samples",
        cDescription: "hold the key and click on the sample to cut it",
        sDescription:
          "hold the key and drag sample's edge to stretch/squeeze it",
        dDescription: "hold the key and click on the sample to delete it",
        text1: "You can resize sample by dragging it's edges.",
      },
    },
  },
};
