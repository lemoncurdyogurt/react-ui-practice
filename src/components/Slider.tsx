import Knob from "../assets/slider_knobs.svg?react";
import useDraggableKnob from "../utils/useDraggableKnob";
import { useEffect, useState } from "react";

const Slider = () => {
  const [ratioNow, setRatioNow] = useState(0);

  const { trackRef, position, handleMouseDown, initDragEvents } =
    useDraggableKnob((ratio) => {
      setRatioNow(Number((ratio * 100).toFixed(0)));
    });

  useEffect(() => {
    const cleanup = initDragEvents();
    return cleanup;
  }, [initDragEvents]);

  return (
    <div className="flex items-center gap-9">
      <div
        ref={trackRef}
        className="relative w-[284px] h-[8px] bg-black/5 rounded-full"
      >
        <div
          className="absolute top-0 left-0 h-full bg-blue/50 rounded-full"
          style={{ width: `${position * 100}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
          onMouseDown={handleMouseDown}
          style={{ left: `calc(${position * 100}% - 10px)` }}
        >
          <Knob className="w-[40px] h-[40px]" />
        </div>
      </div>

      <div className="text-sm font-bold">{ratioNow}%</div>
    </div>
  );
};
export default Slider;
