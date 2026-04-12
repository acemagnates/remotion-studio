import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Extrapolate } from "remotion";
import React from "react";

export const PaidInFullStamp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slam = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  const scale = interpolate(slam, [0, 1], [3, 1], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, 5], [0, 1]);
  
  // Camera shake on impact (frame ~10)
  const shake = frame > 10 && frame < 20 ? Math.sin(frame * 2) * 5 : 0;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `translateY(${shake}px)` }}>
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          border: "10px solid #C9A84C",
          padding: "20px 40px",
          color: "#C9A84C",
          fontSize: 140,
          fontWeight: "900",
          fontFamily: "'Courier New', Courier, monospace",
          textAlign: "center",
          textTransform: "uppercase",
          boxShadow: "0 0 30px #C9A84C, inset 0 0 30px #C9A84C",
          transformOrigin: "center",
        }}
      >
        PAID IN FULL
      </div>
    </AbsoluteFill>
  );
};
