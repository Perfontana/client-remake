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
  editor: {
    dropArea: {
      dropFile: "Перетащи сюда аудиофайл",
      click: "Или кликни, чтобы добавить трек",
    },
    header: {
      play: "Воспроизведение",
      pause: "Пауза",
      stop: "Стоп",
      startRecording: "Начать запись",
      stopRecording: "Закончить запись",
      sendSong: "Отправить трек",
      mode: {
        drag: "Перемещение",
        stretch: "Растягивание (зажать S)",
        cut: "Разрезание (зажать C)",
        delete: "Удаление (зажать D)",
      },
    },
    readyOverlay: {
      title: "Вы отправили свою песню. Ожидаем других игроков...",
    },
    trackOptions: {
      mute: "Выключить трек",
      pan: "Баланс",
      remove: "Удалить трек",
      solo: "Переключить режим соло",
      volume: "Громкость",
    },
    bottomMenu: {
      playerIsReady: "закончил",
    },
  },
};
