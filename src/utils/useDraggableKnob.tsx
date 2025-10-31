import { useState, useRef, useCallback } from "react";

const useDraggableKnob = (onChange?: (value: number) => void) => {
  const [position, setPosition] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const offsetX = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      const ratio = offsetX / rect.width;

      setPosition(ratio);
      onChange?.(ratio);
    },
    [onChange]
  );

  const initDragEvents = useCallback(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { trackRef, position, handleMouseDown, initDragEvents };
};

export default useDraggableKnob;
