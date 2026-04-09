import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const AgentVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Central Hub Pulse
  const pulse = Math.sin(frame * 0.1) * 0.1 + 1;
  const rotate = frame * 0.5;

  // Orbiting packets
  const packets = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * (360 / 8) + frame * 2) % 360;
    const radius = 200 + Math.sin(frame * 0.05 + i) * 20;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: width / 2 + x,
          top: height / 2 + y,
          width: 15,
          height: 15,
          backgroundColor: "#00ff96",
          borderRadius: 4,
          boxShadow: "0 0 15px #00ff96",
          opacity: interpolate(Math.sin(frame * 0.1 + i), [-1, 1], [0.3, 1]),
        }}
      />
    );
  });

  const textEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20 },
  });

  return (
    <div style={{ flex: 1, backgroundColor: "transparent", position: "relative" }}>
      {/* Central Hub */}
      <div
        style={{
          position: "absolute",
          left: width / 2 - 100,
          top: height / 2 - 100,
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "2px solid #00ff96",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${pulse}) rotate(${rotate}deg)`,
          boxShadow: "inset 0 0 50px rgba(0, 255, 150, 0.3), 0 0 50px rgba(0, 255, 150, 0.3)",
        }}
      >
        <div style={{ width: 100, height: 100, backgroundColor: "#00ff96", borderRadius: "50%", opacity: 0.8 }} />
      </div>

      {packets}

      <div
        style={{
          position: "absolute",
          bottom: 400,
          width: "100%",
          textAlign: "center",
          color: "white",
          fontFamily: "sans-serif",
          fontSize: 80,
          fontWeight: "bold",
          opacity: textEntrance,
          transform: `translateY(${interpolate(textEntrance, [0, 1], [50, 0])}px)`,
          textShadow: "0 0 20px black",
        }}
      >
        SOFTWARE THAT<br />
        <span style={{ color: "#00ff96" }}>THINKS</span>
      </div>
    </div>
  );
};
