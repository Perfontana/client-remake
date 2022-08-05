import { UIText } from ".";

export const russianTranslation: UIText = {
  mainPage: {
    createRoomBtn: "Создать комнату",
    usernamePlaceholder: "Имя игрока",
  },
  activeRoomNotice: {
    title: "Последняя игра",
    players: "Игроков",
    round: "Раунд",
    ended: "Игра окончена",
    notStarted: "Не начата",
    join: "Присоединиться",
    leave: "Выйти",
  },
  imageInput: {
    placeholder: "Выбрать аватар",
  },
  error: {
    roomCreaion: "Не получилось создать комнату",
  },
  validation: {
    required: "Обязательное поле",
    tooShort: (min: number) => `Не менее ${min} символов`,
    tooLong: (max: number) => `Не более ${max} символов`,
    tooSmall: (min: number) => `Не должен быть меньше чем ${min}`,
    tooBig: (max: number) => `Не должен быть больше чем ${max}`,
  },
  lobby: {
    players: "Игроки",
    roomUpdateSuccess: "Настройки комнаты обновлены",
    roomUpdateFail: "Не удалось обновить настройки комнаты",
    roomOptions: {
      title: "Настройки комнаты",
      playerCount: "Количество игроков",
      roundTime: "Длительность раунда в секундах",
      save: "Сохранить",
    },
  },
};
