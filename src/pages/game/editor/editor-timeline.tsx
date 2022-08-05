import { Box, HStack, Text, useDimensions, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { marks } from "../../../store/editorMarks";
import { useMouseDrag } from "../../../utils/useMouseDrag";

const TRACK_HEIGHT = 50;

export const EditorWorkArea = observer(() => {
  return (
    <HStack align={"baseline"} spacing={0} justify={"baseline"}>
      <EditorTrackOptions />
      <EditorTracks />
    </HStack>
  );
});

export const EditorTrackOptions = observer(() => {
  return (
    <VStack align="stretch" spacing={0}>
      <Box
        zIndex={1}
        h={TRACK_HEIGHT}
        position={"sticky"}
        left={0}
        bg={"pink.100"}
      >
        Track volume
      </Box>
    </VStack>
  );
});

export const EditorTracks = observer(({}: any) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState(0);
  const [startPosition, setStartPosition] = useState(0);

  const ref = useRef();
  const dimentions = useDimensions(ref, true);

  const changeScale = (e: WheelEvent) => {
    setScale((scale) => {
      const newScale = scale + e.deltaY / 5000;

      return Math.max(0.2, newScale);
    });
  };

  const changePosition = useCallback(
    ({ x }: { x: number; y: number }) => {
      setPosition(Math.max(0, startPosition + x));
    },
    [setPosition, startPosition]
  );

  const onMouseDragStart = () => {
    setStartPosition(position);
  };

  useMouseDrag({
    button: 1,
    onChange: changePosition,
    onStart: onMouseDragStart,
  });

  useEffect(() => {
    document.addEventListener("wheel", changeScale);

    return () => {
      document.removeEventListener("wheel", changeScale);
    };
  }, []);

  const onClick = (e: any) => {
    if (!dimentions) return;

    const clickPos = e.clientX - window.innerWidth + dimentions.borderBox.width;

    const positionSeconds =
      (position / dimentions.borderBox.width) * 30 * scale;

    const seconds =
      (clickPos / dimentions.borderBox.width) * 30 * scale + positionSeconds;

    console.log(seconds);
  };

  useEffect(() => {
    if (dimentions?.borderBox.width) marks.setWidth(dimentions.borderBox.width);

    marks.setScale(scale);
    marks.setPosition(position);

    marks.createMarks();
  }, [dimentions?.borderBox.width, scale, position]);

  return (
    <HStack ref={ref} overflowX={"hidden"} flex={1} onClick={onClick}>
      <Timeline
        scale={scale}
        position={position}
        width={dimentions?.borderBox.width}
      />
    </HStack>
  );
});

export const Timeline = observer(({}: any) => {
  return (
    <HStack
      spacing={0}
      bg={"gray.600"}
      position={"relative"}
      w={"full"}
      h={"25px"}
      color={"white"}
      p={1}
    >
      <Marks />
    </HStack>
  );
});

export const Marks = observer(() => {
  return (
    <>
      {marks.marks.map((mark) => {
        return <Mark key={mark.value} mark={mark} />;
      })}
    </>
  );
});

export const Mark = observer(({ mark }: any) => {
  const baseStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    transform: "translate(-50%, 0)",
    position: "absolute",
    alignItems: "center",
    justifyItems: "center",
  };

  return (
    <div style={{ ...baseStyle, left: mark.position }}>
      <Text fontSize={8}>{mark.value.toFixed(1)}</Text>
      <Box w={"1px"} h={2} bg="white"></Box>
    </div>
  );
});
