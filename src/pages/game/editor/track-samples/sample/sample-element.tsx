import { Text } from "@chakra-ui/react";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { MouseEvent, useEffect, useMemo } from "react";
import { useDrag, useDragDropManager } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { editor, EditorMode } from "../../../../../store/editor";
import { Sample } from "../../../../../store/sample";
import {
  intervalFromSecondsToPixels,
  pointFromPixelsToSeconds,
  pointFromSecondsToPixels,
} from "../../../../../utils/transformCoordinates";
import { SampleResizer } from "./sample-resizer";
import { SampleWaveform } from "./sample-waveform";

const styleBase = {
  position: "absolute",
  height: "100%",
  backgroundColor: "#0000008e",
  borderRadius: "5px",
};

export const SampleElement = observer(({ sample }: { sample: Sample }) => {
  const pixelWidth = intervalFromSecondsToPixels(
    sample.length / sample.speed,
    editor.width,
    editor.scale
  );

  const pixelPosition = useMemo(
    () =>
      pointFromSecondsToPixels(
        sample.position,
        editor.width,
        editor.scale,
        editor.position
      ),
    [editor.scale, editor.width, editor.position, sample.position]
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

        if (sample.track.isBlocked) return;

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

  const onSampleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (sample.track.isBlocked) return;

    switch (editor.mode) {
      case EditorMode.Cut: {
        sample.cut(
          pointFromPixelsToSeconds(
            e.clientX - editor.leftOffset,
            editor.width,
            editor.scale,
            editor.position
          )
        );

        break;
      }
      case EditorMode.Delete: {
        sample.remove();

        break;
      }
    }
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button === 0 && e.altKey && !sample.track.isBlocked) {
      const copy = sample.copy();
      sample.track.addSample(copy);
    }
  };

  const getCursor = () => {
    switch (editor.mode) {
      case EditorMode.Cut: {
        return "col-resize";
      }
    }

    return "inherit";
  };

  const getBorder = () => {
    switch (editor.mode) {
      case EditorMode.Delete: {
        return "1px solid red";
      }
    }

    return "none";
  };

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <>
      <div
        ref={dragRef}
        style={{
          position: "absolute",
          left: `${pixelPosition}px`,
          height: "100%",
          width: `${pixelWidth}px`,
          backgroundColor: "#0000008e",
          cursor: getCursor(),
          border: getBorder(),
          borderRadius: "5px",
          color: "#d4d4d4",
          display: "flex",
          overflow: "hidden",
        }}
        onClick={onSampleClick}
        onMouseDown={onMouseDown}
      >
        <SampleResizer sample={sample} />
        <SampleWaveform
          sample={sample}
          color="#ffdd1d"
          containerWidth={editor.width}
          containerScale={editor.scale}
        />

        <Text ml={"5px"} whiteSpace="nowrap" fontSize={"10px"}>
          {sample.name}
        </Text>
      </div>
    </>
  );
});
