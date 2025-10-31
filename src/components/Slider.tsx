import Knob from "../assets/slider_knobs.svg?react";

const Slider = () => {
  return (
    <div className="relative w-[284px] h-[8px] bg-black/5">
      <div className="absolute top-1/2 -translate-y-1/2 cursor-pointer">
        <Knob className="w-[40px] h-[40px]"/>
      </div>
    </div>
  );
};
export default Slider;
