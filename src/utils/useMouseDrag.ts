import { MouseEvent, useCallback, useEffect, useState } from "react";

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

  const onMouseUp = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (e.button === button) {
        setIsDragging(false);
      }
    },
    [setIsDragging, button]
  );

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      onChange &&
        onChange({ x: dragStart.x - e.clientX, y: dragStart.y - e.clientY });
    },
    [dragStart, isDragging, onChange]
  );

  const onMouseDown = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (e.button === button) {
        setDragStart({ x: e.clientX, y: e.clientY });
        setIsDragging(true);

        onStart && onStart(dragStart);
      }
    },
    [setDragStart, setIsDragging, onStart]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return { onMouseDown };
};
