import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Extrapolate } from "remotion";
import React from "react";

export const RealityOverlay = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const slideY = interpolate(entrance, [0, 1], [100, 0]);
  const slowScale = interpolate(frame, [0, 180], [1, 1.03]);
  const opacity = interpolate(frame, [150, 180], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", paddingBottom: 300, alignItems: "center" }}>
      <div
        style={{
          transform: `translateY(${slideY}px) scale(${slowScale})`,
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 100,
            fontWeight: "900",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.2em",
          }}
        >
          REALITY
        </span>
        <div
          style={{
            width: "120%",
            height: 4,
            backgroundColor: "#C9A84C",
            boxShadow: "0 0 15px #C9A84C",
            marginTop: 10,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
