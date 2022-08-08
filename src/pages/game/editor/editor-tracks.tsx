import { useDimensions, HStack, Box, VStack } from "@chakra-ui/react";
import { autorun, runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  WheelEvent,
  MouseEvent,
} from "react";
import { useDrag, useDragDropManager, useDragLayer } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { editor } from "../../../store/editor";
import { Sample } from "../../../store/sample";
import { Track } from "../../../store/track";
import tracks from "../../../store/tracks";
import waveforms from "../../../store/waveforms";
import {
  intervalFromPixelsToSeconds,
  intervalFromSecondsToPixels,
  pointFromPixelsToSeconds,
  pointFromSecondsToPixels,
} from "../../../utils/transformCoordinates";
import { useMouseDrag } from "../../../utils/useMouseDrag";
import { EditorPlayPointer } from "./editor-play-pointer";
import { Timeline } from "./editor-timeline";
import { TRACK_HEIGHT } from "./editor-work-area";

export const SCALE_1_SECONDS = 30;

export const EditorTracks = observer(() => {
  const [startPosition, setStartPosition] = useState(0);

  const ref = useRef(null);
  const dimentions = useDimensions(ref, true);

  const changeScale = (e: WheelEvent<HTMLDivElement>) => {
    editor.set({ scale: Math.max(0.2, editor.scale + e.deltaY / 5000) });
  };

  const changePosition = useCallback(
    ({ x }: { x: number; y: number }) => {
      editor.set({ position: Math.max(0, startPosition + x) });
    },
    [startPosition]
  );

  const onMouseDragStart = () => {
    setStartPosition(editor.position);
  };

  const { onMouseDown } = useMouseDrag({
    button: 1,
    onChange: changePosition,
    onStart: onMouseDragStart,
  });

  useEffect(() => {
    if (dimentions?.borderBox.width) {
      editor.set({
        width: dimentions.borderBox.width,
        leftOffset: dimentions.borderBox.left,
      });
    }
  }, [dimentions?.borderBox.width]);

  const onClick = (e: any) => {
    if (!dimentions) return;

    const clickPos = e.clientX - editor.leftOffset;

    const seconds = pointFromPixelsToSeconds(
      clickPos,
      dimentions.borderBox.width,
      editor.scale,
      editor.position
    );

    console.log(seconds);
  };

  return (
    <VStack
      onWheel={changeScale}
      onMouseDown={onMouseDown}
      onClick={onClick}
      spacing={0}
      ref={ref}
      overflowX={"hidden"}
      flex={1}
    >
      <EditorPlayPointer />

      <Timeline />
      <Tracks />
    </VStack>
  );
});

export const Tracks = observer(() => {
  return (
    <>
      {tracks.tracks.map((track) => (
        <HStack
          spacing={0}
          key={track.id}
          position={"relative"}
          h={TRACK_HEIGHT}
          bg="magenta"
          w={"full"}
        >
          <TrackSamples track={track} />
        </HStack>
      ))}
    </>
  );
});

export const TrackSamples = observer(({ track }: { track: Track }) => {
  return (
    <>
      {track.samples.map((sample) => (
        <SampleElement key={sample.id} sample={sample} />
      ))}
    </>
  );
});

export const SampleElement = observer(({ sample }: { sample: Sample }) => {
  const pixelWidth = intervalFromSecondsToPixels(
    sample.length,
    editor.width,
    editor.scale
  );

  const pixelPosition = pointFromSecondsToPixels(
    sample.position,
    editor.width,
    editor.scale,
    editor.position
  );

  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();

  useEffect(
    () =>
      monitor.subscribeToOffsetChange(() => {
        const initialMouseOffset = monitor.getInitialClientOffset();
        const initialSampleOffset = monitor.getInitialSourceClientOffset();
        const currentMouse = monitor.getClientOffset();
        const draggedSample = monitor.getItem();

        if (monitor.getItem()?.id !== sample.id) return;

        if (
          monitor.getItemType() !== "sample" ||
          !initialMouseOffset ||
          !currentMouse ||
          !initialSampleOffset ||
          !draggedSample
        )
          return;

        let samplePosition = Math.max(
          ((initialSampleOffset.x +
            currentMouse.x -
            initialMouseOffset.x +
            editor.position -
            Math.floor(editor.leftOffset)) /
            editor.width) *
            editor.timeWidth,
          0
        );

        runInAction(() => sample.set({ position: samplePosition }));
      }),
    [monitor]
  );

  const [_, dragRef, dragPreview] = useDrag(
    () => ({
      type: "sample",
      item: sample,
    }),
    []
  );

  const cutSample = (e: MouseEvent<HTMLDivElement>) => {
    sample.cut(
      ((e.screenX - editor.leftOffset - window.screenX) / editor.width) *
        editor.timeWidth
    );
  };

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <>
      <HStack
        spacing={0}
        ref={dragRef}
        position={"absolute"}
        left={pixelPosition}
        h={"full"}
        w={`${pixelWidth}px`}
        bg={"green.200"}
        onClick={cutSample}
      >
        <SampleResizer sample={sample} />
        <SampleWaveform sample={sample} />
      </HStack>
    </>
  );
});

const SampleResizer = observer(({ sample }: { sample: Sample }) => {
  const [startValues, setStartValues] = useState({
    position: 0,
    length: 0,
    offset: 0,
  });

  const onOffsetChange = ({ x }: any) => {
    const deltaSeconds = -intervalFromPixelsToSeconds(
      x,
      editor.width,
      editor.scale
    );

    const offset = Math.max(0, startValues.offset + deltaSeconds);
    const position =
      offset === 0 ? sample.position : startValues.position + deltaSeconds;
    const length =
      offset === 0 ? sample.length : startValues.length - deltaSeconds;

    sample.set({
      offset,
      position,
      length,
    });
  };

  const onLengthChange = ({ x }: any) => {
    sample.set({
      length: Math.min(
        startValues.length -
          intervalFromPixelsToSeconds(x, editor.width, editor.scale),
        sample.player.buffer.duration - sample.offset
      ),
    });
  };

  const onStart = () => {
    setStartValues({
      length: sample.length,
      offset: sample.offset,
      position: sample.position,
    });
  };

  const { onMouseDown: onOffsetDrag } = useMouseDrag({
    button: 0,
    onStart,
    onChange: onOffsetChange,
  });

  const { onMouseDown: onLengthDrag } = useMouseDrag({
    button: 0,
    onStart,
    onChange: onLengthChange,
  });

  return (
    <>
      <Box
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onOffsetDrag(e);
        }}
        onClick={(e) => e.stopPropagation()}
        position={"absolute"}
        left={0}
        h={"full"}
        w={"5px"}
        cursor="ew-resize"
      ></Box>

      <Box
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onLengthDrag(e);
        }}
        onClick={(e) => e.stopPropagation()}
        position={"absolute"}
        right={0}
        h={"full"}
        w={"5px"}
        cursor="ew-resize"
      ></Box>
    </>
  );
});

const SampleWaveform = observer(({ sample }: { sample: Sample }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWaveform = useCallback(() => {
    if (canvasRef.current) {
      waveforms.drawWaveform(
        sample,
        canvasRef.current,
        intervalFromSecondsToPixels(sample.length, editor.width, editor.scale)
      );
    }
  }, [sample.length, sample.offset, editor.width, editor.scale]);

  useEffect(drawWaveform, [drawWaveform]);

  return (
    <canvas
      style={{ width: "100%", height: "100%" }}
      className="sample-waveform"
      ref={canvasRef}
    ></canvas>
  );
});

tracks.addTrack();

Sample.loadFromUrl(
  "https://tonejs.github.io/audio/loop/FWDL.mp3",
  "https://tonejs.github.io/audio/loop/kick.mp3",
  tracks.tracks[0]
);

const DragLayer = () => {
  const collectedProps = useDragLayer((monitor) => {});
  return null;
};
