import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";

export const ViewCounterStreak = () => {
  const frame = useCurrentFrame();
  const { height, durationInFrames } = useVideoConfig();

  const scrollOffset = (frame * 50) % height;
  const blur = interpolate(frame, [durationInFrames - 30, durationInFrames], [2, 40]);
  const opacity = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0]);

  return (
    <AbsoluteFill style={{ opacity, filter: `blur(${blur}px)` }}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: (i * 200 + scrollOffset) % (height + 200) - 200,
            left: (i * 157) % 800 + 100,
            color: "rgba(255, 255, 255, 0.3)",
            fontFamily: "monospace",
            fontSize: 40,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          👁️ {Math.floor(Math.random() * 1000000)}
        </div>
      ))}
    </AbsoluteFill>
  );
};
