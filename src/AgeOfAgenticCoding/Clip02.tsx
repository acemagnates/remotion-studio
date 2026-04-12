import React from "react";
import { ParallaxEngine } from "./ParallaxEngine";

export const Clip02: React.FC = () => {
  return (
    <ParallaxEngine 
      bgPath="layers/clip_02_bg.png"
      subjectPath="layers/clip_02_subject.png"
      fgPath="layers/clip_02_fg.png"
    />
  );
};
