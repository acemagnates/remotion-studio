import { Series, useVideoConfig } from "remotion";
import { TitleScene } from "./TitleScene";
import { Clip01 } from "./Clip01";
import { Clip02 } from "./Clip02";
import { Clip08 } from "./Clip08";

export const MainClip = () => {
  const { fps } = useVideoConfig();

  return (
    <Series>
      <Series.Sequence durationInFrames={5 * fps}> 
        <TitleScene />
      </Series.Sequence>

      {/* Clip 01: SYMBOLIC_LOOP (10s) */}
      <Series.Sequence durationInFrames={10 * fps}> 
        <Clip01 />
      </Series.Sequence>

      {/* Clip 02: HERO_PARALLAX (5s) */}
      <Series.Sequence durationInFrames={5 * fps}> 
        <Clip02 />
      </Series.Sequence>
      
      {/* Clip 08: DISRUPTION (3.5s) */}
      <Series.Sequence durationInFrames={3.5 * fps}> 
        <Clip08 />
      </Series.Sequence>
    </Series>
  );
};
