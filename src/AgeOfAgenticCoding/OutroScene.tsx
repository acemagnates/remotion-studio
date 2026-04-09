import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const progress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          fontSize: 40,
          color: "rgba(255, 255, 255, 0.6)",
          letterSpacing: 10,
          marginBottom: 20,
          opacity: entrance,
        }}
      >
        A PRODUCTION BY
      </div>
      <div
        style={{
          fontSize: 100,
          fontWeight: 900,
          color: "#00ff96",
          letterSpacing: -2,
          transform: `scale(${entrance})`,
          textShadow: "0 0 40px rgba(0, 255, 150, 0.6)",
        }}
      >
        ACE MAGNATES
      </div>
      <div
        style={{
          marginTop: 100,
          width: 300,
          height: 2,
          backgroundColor: "#00ff96",
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
};
