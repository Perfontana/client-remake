import { Box } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { editor, EditorMode } from "../../../store/editor";
import { Sample } from "../../../store/sample";
import { intervalFromPixelsToSeconds } from "../../../utils/transformCoordinates";
import { useMouseDrag } from "../../../utils/useMouseDrag";

export const SampleResizer = observer(({ sample }: { sample: Sample }) => {
  const [startValues, setStartValues] = useState({
    position: 0,
    length: 0,
    offset: 0,
    speed: 1,
  });

  const onOffsetChange = ({ x }: any) => {
    if (editor.mode === EditorMode.None) {
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

      if (length < 0.2) return;

      sample.set({
        offset,
        position,
        length,
      });
    } else if (editor.mode === EditorMode.Stretch) {
      const deltaSeconds = -intervalFromPixelsToSeconds(
        x,
        editor.width,
        editor.scale
      );

      const position = startValues.position + deltaSeconds;
      const length = startValues.length / startValues.speed - deltaSeconds;
      const speed = startValues.length / length;

      console.log(startValues.length / length);

      sample.set({
        speed,
        position,
      });
    }
  };

  const onLengthChange = ({ x }: any) => {
    const length = Math.min(
      startValues.length -
        intervalFromPixelsToSeconds(x, editor.width, editor.scale),
      sample.player.buffer.duration - sample.offset
    );

    if (length < 0.2) return;

    sample.set({
      length,
    });
  };

  const onStart = () => {
    setStartValues({
      length: sample.length,
      offset: sample.offset,
      position: sample.position,
      speed: sample.speed,
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
