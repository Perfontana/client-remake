import { SpinnerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  useBoolean,
  useDimensions,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { BsPause, BsPlay } from "react-icons/bs";
import { MdSearch } from "react-icons/md";
import {
  downloadFromYoutube,
  FreesoundSample,
  SampleSearchQuerry,
  searchSample,
} from "../../../../../api/samples";
import { Sample } from "../../../../../store/sample";
import { Track } from "../../../../../store/track";
import tracks from "../../../../../store/tracks";
import { pointFromPixelsToSeconds } from "../../../../../utils/transformCoordinates";

export const SamplePicker = observer(() => {
  const [isLoading, { on, off }] = useBoolean(false);
  const [nextResults, setNextResults] = useState<SampleSearchQuerry | null>(
    null
  );

  const [search, setSearch] = useState("");
  const [samples, setSamples] = useState<FreesoundSample[]>([]);

  const { isOpen, onToggle, onClose } = useDisclosure();

  const searchSamples = async (e: FormEvent) => {
    e.preventDefault();

    on();
    const res = await searchSample({ query: search });
    off();

    setSamples(res.data.results);
    setNextResults(res.data.next);
  };

  const loadNextResults = async () => {
    if (!nextResults) return;

    on();
    const res = await searchSample(nextResults);
    off();

    setSamples((samples) => [...samples, ...res.data.results]);
    setNextResults(res.data.next);
  };

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button onClick={onToggle}>Select a sample</Button>
      </PopoverTrigger>

      <PopoverContent>
        <VStack
          borderRadius={10}
          spacing={4}
          maxH={"400px"}
          bg="white"
          position="relative"
          overflowY={"scroll"}
          justifySelf={"flex-end"}
        >
          <HStack
            p={3}
            pt={5}
            bg={"white"}
            w={"full"}
            zIndex={2}
            position={"sticky"}
            top={0}
            boxShadow="1px 1px 10px #00000050"
          >
            <PopoverCloseButton zIndex={4} top={"0"} left={"0"} />
            <form style={{ width: "100%" }} onSubmit={searchSamples}>
              <InputGroup>
                <Input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <InputRightElement>
                  <IconButton
                    isLoading={isLoading}
                    aria-label="Search"
                    icon={<MdSearch />}
                    type="submit"
                  />
                </InputRightElement>
              </InputGroup>
            </form>
          </HStack>

          {samples.map((sample) => (
            <SampleSearchResult key={sample.id} sample={sample} />
          ))}

          {nextResults && (
            <div style={{ width: "100%" }}>
              <Button
                colorScheme={"teal"}
                isLoading={isLoading}
                onClick={loadNextResults}
                w={"full"}
                display="block"
              >
                Load more results
              </Button>
            </div>
          )}
        </VStack>
      </PopoverContent>
    </Popover>
  );
});

export const SampleSearchResult = observer(({ sample }: any) => {
  const [_, dragRef] = useDrag(
    () => ({
      type: "url-sample",
      item: { name: sample.name, url: sample.previews["preview-hq-mp3"] },
    }),
    []
  );

  return (
    <Box ref={dragRef} w={"100%"}>
      <Audio
        name={sample.name}
        src={sample.previews["preview-hq-mp3"]}
        duration={sample.duration}
      />
    </Box>
  );
});

export const Audio = ({ src, name, duration }: any) => {
  const [paused, { toggle: togglePlayback, on: setPaused, off: setPlaying }] =
    useBoolean(true);

  const containerRef = useRef(null);
  const dimentions = useDimensions(containerRef);

  const [position, setPosition] = useState(0);

  const audio = useRef<HTMLAudioElement>(null);

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
    if (!dimentions || !audio.current) return;

    const clickPosition = e.clientX - dimentions.borderBox.left;

    const position = pointFromPixelsToSeconds(
      clickPosition,
      dimentions.borderBox.width,
      1,
      0,
      duration
    );

    audio.current.currentTime = position;
  };

  return (
    <HStack
      spacing={0}
      w={"full"}
      m={0}
      justify={"flex-start"}
      align={"center"}
    >
      <audio
        ref={audio}
        style={{ height: "30px", backgroundColor: "transparent" }}
        src={src}
      />

      {paused ? (
        <IconButton
          borderRadius={"0"}
          aria-label="Play"
          icon={<BsPlay />}
          onClick={play}
        />
      ) : (
        <IconButton
          margin={"unset"}
          borderRadius={"0"}
          aria-label="Pause"
          icon={<BsPause />}
          onClick={pause}
        />
      )}

      <HStack
        overflow={"hidden"}
        position={"relative"}
        alignSelf="stretch"
        flex={1}
        ref={containerRef}
        onClick={onProgressClick}
        spacing={0}
        justify="space-between"
      >
        <div
          style={{
            height: "100%",
            width: `${(position / (duration ?? 1)) * 100}%`,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#53ba9e",
            zIndex: 0,
          }}
        ></div>
        <Text
          title={name}
          pl={2}
          zIndex={1}
          fontSize="14px"
          whiteSpace={"nowrap"}
        >
          {name.slice(0, 20)}
          {name.length > 20 && "..."}
        </Text>

        <Text pr={2} zIndex={1} fontSize="14px" whiteSpace={"nowrap"}>
          {position.toFixed(1)} / {duration.toFixed(1) || "..."}
        </Text>
      </HStack>
    </HStack>
  );
};
