import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import React from "react";

const DiagonalSlash = ({ active }: { active: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  if (!active) return null;

  return (
    <div
      style={{
        position: "absolute",
        width: "140%",
        height: 10,
        backgroundColor: "#C9A84C",
        boxShadow: "0 0 20px #C9A84C",
        transform: `rotate(-45deg) scaleX(${progress})`,
        top: "50%",
        left: "-20%",
      }}
    />
  );
};

export const IconSequence = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heartCompression = spring({
    frame: frame - 120, // Final second
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const heartScale = interpolate(heartCompression, [0, 1], [1, 0.5]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      <Sequence from={0} durationInFrames={60}>
        <div style={{ position: "relative" }}>
          <div style={{ color: "white", fontSize: 200 }}>📷</div>
          <DiagonalSlash active />
        </div>
      </Sequence>
      
      <Sequence from={60} durationInFrames={60}>
        <div style={{ position: "relative" }}>
          <div style={{ color: "white", fontSize: 200 }}>🕸️</div>
          <DiagonalSlash active />
        </div>
      </Sequence>

      <Sequence from={120} durationInFrames={60}>
        <div style={{ transform: `scale(${heartScale})` }}>
           <div style={{ color: "white", fontSize: 200 }}>❤️</div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
