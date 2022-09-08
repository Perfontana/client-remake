import { useDimensions, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef, useState, WheelEvent } from "react";
import { editor } from "../../../../store/editor";
import { sound } from "../../../../store/sound";
import tracks from "../../../../store/tracks";
import {
  pointFromPixelsToSeconds,
  pointFromSecondsToPixels,
} from "../../../../utils/transformCoordinates";
import { useMouseDrag } from "../../../../utils/useMouseDrag";
import { EditorPlayPointer } from "../timeline/editor-play-pointer";
import { Timeline } from "../timeline/editor-timeline";
import { TrackList } from "./tracks";

export const SCALE_1_SECONDS = 30;

export const EditorTracks = observer(() => {
  const [startPosition, setStartPosition] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const dimentions = useDimensions(ref, true);

  const changeScale = (e: WheelEvent) => {
    e.preventDefault();

    const deltaScale = e.deltaY / 5000;
    const scale = Math.max(0.2, editor.scale + deltaScale);

    const position = pointFromSecondsToPixels(
      editor.timePosition,
      editor.width,
      scale,
      0
    );

    editor.set({ scale, position });

    return false;
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
        width: Math.round(dimentions.borderBox.width),
        leftOffset: Math.round(dimentions.borderBox.left),
      });
    }
  }, [dimentions?.borderBox.width]);

  useEffect(() => {
    ref.current?.addEventListener("wheel", changeScale as any, {
      passive: false,
    });

    return () => {
      ref.current?.removeEventListener("wheel", changeScale as any);
    };
  }, [changeScale]);

  const onClick = (e: any) => {
    if (!dimentions) return;

    const clickPos = e.clientX - editor.leftOffset;

    const seconds = pointFromPixelsToSeconds(
      clickPos,
      dimentions.borderBox.width,
      editor.scale,
      editor.position
    );

    sound.position = seconds;
  };

  return (
    <VStack
      onMouseDown={onMouseDown as any}
      onClick={onClick}
      spacing={0}
      ref={ref}
      overflowX={"hidden"}
      position={"relative"}
      flex={1}
    >
      <EditorPlayPointer />
      <Timeline />
      <TrackList />
    </VStack>
  );
});
