import { useCallback, useEffect, useState } from "react";

export interface UseMouseDragParams {
  button: number;
  onStart?: (coordinates: { x: number; y: number }) => any;
  onChange?: (delta: { x: number; y: number }) => any;
}

export const useMouseDrag = ({
  button,
  onStart,
  onChange,
}: UseMouseDragParams) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (e.button === button) {
        setIsDragging(false);
      }
    },
    [setIsDragging, button]
  );

  const handleMouseMovement = useCallback(
    (e: MouseEvent) => {
      if (isDragging)
        onChange &&
          onChange({ x: dragStart.x - e.clientX, y: dragStart.y - e.clientY });
    },
    [dragStart, isDragging, onChange]
  );

  const changePosition = useCallback(
    (e: MouseEvent) => {
      if (e.button === button) {
        setDragStart({ x: e.clientX, y: e.clientY });
        setIsDragging(true);

        onStart && onStart(dragStart);
      }
    },
    [setDragStart, setIsDragging, onStart, handleMouseMovement]
  );

  useEffect(() => {}, [dragStart, handleMouseMovement, handleMouseUp]);

  useEffect(() => {
    document.addEventListener("mousedown", changePosition);
    document.addEventListener("mousemove", handleMouseMovement);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", changePosition);
      document.removeEventListener("mousemove", handleMouseMovement);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [changePosition, handleMouseMovement, handleMouseUp]);
};
