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
    joinRoom: "Присоединиться",
    guide: "Управление в игре",
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
      freesound: {
        placeholder: "Какой звук вы хотите найти?",
        tooltipText: "Найти семплы на freesound.org",
      },
      youtube: {
        placeholder: "Вставьте ссылку на видео",
        tooltipText: "Добавить звук из видео",
      },
    },
  },
  guide: {
    label: "Инструкция",
    header: "Инструкция",
    playback: {
      header: "Воспроизведение",
      text1:
        "Воспроизведением можно управлять с помощью кнопок в верхнем левом угру экрана. Можно использовать клавиатуру:",
      space: "пробел",
      spaceDescription: "пауза/воспроизведение",
      wDescription: "для перемещения в начало песни",
      text2: "Вы можете переместиться по песне, клинув по треку или таймлайну.",
    },
    navigation: {
      header: "Навигация",
      wheelClickDrag: "колесико мыши",
      wheelClickDragDescription:
        "зажмите и тащите, чтобы переместиться по треку",
      wheel: "колесико мыши",
      wheelDescription: "прокрутите для изменения масштаба",
    },
    samples: {
      header: "Семплы",
      addingSamples: {
        header: "Добавление семплов",
        micro: "Запись микрофона",
        microText:
          "Для начала записи используйте кнопку в верхнем левом  угру. Используйте ту же кнопку для окончания записи. Сохраненная запись отобразится на новом треке.",
        file: "Файлы",
        fileText: "Перетащите mp3 или wav файл в редактор.",
        freesound: "Freesound.org",
        freesoundText:
          "Вы можете искать семплы на freesound.org, нажав на кнопку в нижнем правом углу экрана. Перетяните понравившийся семпл в редактор.",
        youtube: "Youtube",
        youtubeText:
          "Вы можете скачать звук видео, используя кнопку Youtube. Укажите ссылку на видео или его id. Нельзя загрузить видео длительностью более 10 минут. Некоторые видео просто нельзя скачать, вы увидите ошибку 503.",
        copy: "Создание копии семпла",
        copyText:
          "Вы можете скопировать существующий семпл, перетащив его с зажатой клавишей Alt / Option",
      },
      changingSamples: {
        header: "Изменение семплов",
        cDescription:
          "зажмите клавишу и кликните по семплу, чтобы разрезать его",
        sDescription:
          "зажмите клавишу и тяните границы семпла, чтобы растянуть или сжать его",
        dDescription: "зажмите клавишу и кликните по семплу, чтобы удалить его",
        text1: "Потяните за границы семпла, чтобы обрезать его.",
      },
    },
  },
};
