import { HStack } from "@chakra-ui/react";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { MouseEvent, useEffect } from "react";
import { useDragDropManager, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { editor, EditorMode } from "../../../store/editor";
import { Sample } from "../../../store/sample";
import {
  intervalFromSecondsToPixels,
  pointFromSecondsToPixels,
  pointFromPixelsToSeconds,
} from "../../../utils/transformCoordinates";
import { SampleResizer } from "./sample-resizer";
import { SampleWaveform } from "./sample-waveform";

export const SampleElement = observer(({ sample }: { sample: Sample }) => {
  const pixelWidth = intervalFromSecondsToPixels(
    sample.length / sample.speed,
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
            editor.leftOffset) /
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
    if (editor.mode === EditorMode.Cut)
      sample.cut(
        pointFromPixelsToSeconds(
          e.clientX - editor.leftOffset,
          editor.width,
          editor.scale,
          editor.position
        )
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
        left={`${pixelPosition}px`}
        h={"full"}
        w={`${pixelWidth}px`}
        bg={"blackAlpha.600"}
        cursor={editor.mode === EditorMode.Cut ? "col-resize" : "inherit"}
        onClick={cutSample}
        borderRadius="5px"
        _hover={{
          boxShadow: "0 0 2px #ffffff",
        }}
      >
        <SampleResizer sample={sample} />
        <SampleWaveform sample={sample} />
      </HStack>
    </>
  );
});
