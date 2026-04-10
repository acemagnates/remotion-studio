import { Series, useVideoConfig } from "remotion";
import { TitleScene } from "./TitleScene";

export const MainClip = () => {
  const { fps } = useVideoConfig(); // Fetch the current composition's frame rate

  return (
    <Series>
      {/* Multiply desired seconds (5) by the frame rate */}
      <Series.Sequence durationInFrames={5 * fps}> 
        <TitleScene />
      </Series.Sequence>
    </Series>
  );
};
