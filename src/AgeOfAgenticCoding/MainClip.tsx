import React from "react";
import { Sequence, Series } from "remotion";
import { AnimatedBackground } from "./AnimatedBackground";
import { TitleScene } from "./TitleScene";
import { AgentVisual } from "./AgentVisual";
import { OutroScene } from "./OutroScene";

export const MainClip: React.FC = () => {
  return (
    <div style={{ flex: 1, backgroundColor: "black" }}>
      <AnimatedBackground />

      <Series>
        <Series.Sequence durationInFrames={420}>
          <TitleScene />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={900}>
          <AgentVisual />
        </Series.Sequence>
        
        <Series.Sequence durationInFrames={480}>
          <OutroScene />
        </Series.Sequence>
      </Series>
    </div>
  );
};
