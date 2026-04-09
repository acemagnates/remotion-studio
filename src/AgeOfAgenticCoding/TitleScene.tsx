import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const slam = spring({
    frame: frame - 45, // Delay the slam
    fps,
    config: {
      damping: 8,
      mass: 2,
    },
  });

  const topTextOffset = interpolate(entrance, [0, 1], [-100, 0]);
  const bottomTextScale = slam > 0 ? interpolate(slam, [0, 1], [3, 1]) : 0;
  const bottomTextOpacity = slam > 0 ? interpolate(slam, [0, 0.2], [0, 1]) : 0;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: 300,
          letterSpacing: 20,
          opacity: entrance,
          transform: `translateY(${topTextOffset}px)`,
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        THE AGE OF
      </div>
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          letterSpacing: -5,
          marginTop: 20,
          transform: `scale(${bottomTextScale})`,
          opacity: bottomTextOpacity,
          color: "#00ff96",
          textShadow: "0 0 30px rgba(0, 255, 150, 0.5)",
          lineHeight: 0.9,
        }}
      >
        AGENTIC<br />CODING
      </div>
    </div>
  );
};
