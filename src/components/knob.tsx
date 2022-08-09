import { Box, Tooltip } from "@chakra-ui/react";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const MIN_ANGLE = 0;
const MAX_ANGLE = 180;

const changeRange = (
  value: number,
  min: number,
  max: number,
  newMin: number,
  newMax: number
) => ((value - min) / (max - min)) * (newMax - newMin) + newMin;

const getRotation = (value: number, min: number, max: number) =>
  changeRange(value, min, max, MIN_ANGLE, MAX_ANGLE);

const getValue = (angle: number, min: number, max: number) =>
  changeRange(angle, MIN_ANGLE, MAX_ANGLE, min, max);

export interface KnobProps {
  onChange: (value: number) => void;
  value: number;
  size?: number;
  min?: number;
  max?: number;
}

const Knob = ({ onChange, value, size = 25, min = 0, max = 1 }: KnobProps) => {
  const [rotation, setRotation] = useState(getRotation(value, min, max));
  const [isDragging, setIsDragging] = useState(false);

  const knobRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      let newRotation = rotation - e.movementY;

      if (newRotation < MIN_ANGLE) newRotation = MIN_ANGLE;
      if (newRotation > MAX_ANGLE) newRotation = MAX_ANGLE;

      setRotation(newRotation);
      onChange(getValue(newRotation, min, max));
    },
    [rotation, min, max, onChange]
  );

  const onMouseUp = useCallback<EventListener>(
    (e) => {
      document.exitPointerLock();
      setIsDragging(false);
    },
    [onMouseMove]
  );

  const onClick = useCallback<MouseEventHandler>(
    (e) => {
      knobRef.current && knobRef.current.requestPointerLock();
      setIsDragging(true);
    },
    [onMouseMove, onMouseUp]
  );

  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging, rotation]);

  const style = { transform: `rotate(${rotation}deg)` };

  return (
    <Tooltip
      hasArrow
      placement="top"
      isOpen={isDragging}
      label={value.toFixed(2)}
    >
      <Box
        ref={knobRef}
        position="relative"
        cursor={"n-resize"}
        onMouseDown={onClick}
      >
        <Box
          style={style}
          m={0}
          display="block"
          position="relative"
          w={`${size}px`}
          h={`${size}px`}
          borderRadius="full"
          bg="#333"
          overflow={"hidden"}
        >
          <span
            style={{
              top: "50%",
              position: "absolute",
              display: "block",
              transform: "translate(0, -50%)",
              width: `${size / 2}px`,
              height: "2px",
              backgroundColor: "#d4d4d4",
            }}
          ></span>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default Knob;
