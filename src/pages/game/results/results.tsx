import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useBoolean,
  useDimensions,
  useMultiStyleConfig,
  useShortcut,
  useTab,
  VStack,
} from "@chakra-ui/react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import {
  forwardRef,
  MouseEvent,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEvent,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { BsPause, BsPlay } from "react-icons/bs";
import Knob from "../../../components/knob";
import { audioBuffers } from "../../../store/audioBuffers";
import game from "../../../store/game";
import { Sample } from "../../../store/sample";
import { sound } from "../../../store/sound";
import tracks from "../../../store/tracks";
import waveforms from "../../../store/waveforms";
import Player from "../../../types/Player";
import { pointFromPixelsToSeconds } from "../../../utils/transformCoordinates";
import { useMouseDrag } from "../../../utils/useMouseDrag";
import { SampleWaveform } from "../editor/track-samples/sample/sample-waveform";
import { PlayerAvatar } from "../lobby/player-avatar";

export interface ResultsTabProps {
  player: Player;
}

const ResultsTab = forwardRef(
  (props: ResultsTabProps, ref: Ref<HTMLElement> | undefined) => {
    const player = props.player;

    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig("Tabs", tabProps);

    return (
      <Button
        __css={styles.tab}
        {...tabProps}
        bg={isSelected ? "teal" : "white"}
      >
        <Box as="span" mr="2">
          <PlayerAvatar player={player} />
        </Box>
      </Button>
    );
  }
);

export const Results = observer(() => {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    game.loadRoom();
  }, []);

  const songs = game.players.map((player) => ({
    id: player._id,
    songs: game.songs[player.name],
  }));

  return (
    <>
      {songs?.length ? (
        <Tabs index={tabIndex} onChange={setTabIndex}>
          <TabList overflowX={"scroll"} overflowY="hidden" position="relative">
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
            {game.players.map((player) => (
              <ResultsTab key={player.name} player={player} />
            ))}
          </TabList>

          <TabPanels>
            {songs.map(({ id, songs }, index) => (
              <TabPanel p={0} key={id} tabIndex={index}>
                {songs.map((song) => (
                  <Audio src={song.url} player={song.player} />
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      ) : (
        <Spinner />
      )}
    </>
  );
});

export const Audio = ({ src, player }: any) => {
  const [paused, { toggle: togglePlayback, on: setPaused, off: setPlaying }] =
    useBoolean(true);

  const [volume, setVolume] = useState(1);

  const [sample, setSample] = useState<Sample | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(0);

  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audio.current && (audio.current.volume = volume);
  }, [volume]);

  const play = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    togglePlayback();
    audio.current?.play();
  };

  const pause = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    togglePlayback();
    audio.current?.pause();
  };

  const onProgress = () => {
    setPosition(audio.current?.currentTime ?? 0);
  };

  const onEnded = () => {
    setPaused();
  };

  useEffect(() => {
    if (audio.current) {
      audio.current.addEventListener("timeupdate", onProgress);
      audio.current.addEventListener("ended", onEnded);
    }

    () => {
      audio.current?.removeEventListener("timeupdate", onProgress);
      audio.current?.removeEventListener("ended", onEnded);
    };
  }, [audio.current, onProgress]);

  const onProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !audio.current) return;

    const dimentions = containerRef.current.getBoundingClientRect();

    const clickPosition = e.clientX - dimentions.left;

    const position = pointFromPixelsToSeconds(
      clickPosition,
      dimentions.width,
      1,
      0,
      audio.current.duration
    );

    console.log(dimentions.width);

    audio.current.currentTime = position;
  };

  useHotkeys("space", () => {
    audio.current?.pause();
    setPaused();
  });

  useEffect(() => {
    const loadSample = async () => {
      const track = tracks.addTrack();

      const sample = await Sample.loadFromUrl(src, src, track);

      setSample(sample ?? null);
    };

    loadSample();
  }, [src]);

  return (
    <HStack
      spacing={0}
      w={"full"}
      m={0}
      h={"100px"}
      justify={"space-between"}
      align={"center"}
      position="relative"
      onClick={onProgressClick}
    >
      <audio ref={audio} src={src} />

      <HStack h={"full"} w={"10%"} zIndex={1} p={2}>
        <Box h="full" alignSelf={"flex-end"}>
          <Knob min={0} max={1} value={volume} onChange={setVolume} />
        </Box>
        <IconButton
          alignSelf={"center"}
          borderRadius={"full"}
          size="sm"
          aria-label="Play"
          icon={paused ? <BsPlay /> : <BsPause />}
          onClick={paused ? play : pause}
        />
      </HStack>

      <HStack
        w={"10%"}
        spacing={4}
        h={"full"}
        zIndex={1}
        justify="space-between"
      >
        <Tooltip shouldWrapChildren label={player}>
          <PlayerAvatar player={game.players.find((p) => p.name === player)} />
        </Tooltip>

        <Text
          p={2}
          pr={2}
          zIndex={1}
          color="white"
          fontSize="10px"
          alignSelf={"flex-start"}
          justifySelf="flex-end"
          whiteSpace={"nowrap"}
        >
          {position.toFixed(1)} / {audio.current?.duration?.toFixed(1) || "..."}
        </Text>
      </HStack>

      <HStack
        overflow={"hidden"}
        position={"absolute"}
        w="full"
        h="full"
        alignSelf="stretch"
        flex={1}
        ref={containerRef}
        spacing={0}
        justify="space-between"
        bg={"gray.500"}
      >
        <div
          style={{
            height: "100%",
            width: `${(position / (audio.current?.duration ?? 1)) * 100}%`,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#319795",
            zIndex: 0,
          }}
        ></div>

        {sample && <SampleWaveform sample={sample} color={"#ffdd1d"} />}
      </HStack>
    </HStack>
  );
};
