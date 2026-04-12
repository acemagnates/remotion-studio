import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import React from "react";

const RollingNumber = ({ x, y, color }: { x: number; y: number; color: string }) => {
  const frame = useCurrentFrame();
  const digit = Math.floor(Math.random() * 10);
  const scroll = (frame * 10) % 100;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        color,
        fontFamily: "monospace",
        fontSize: 24,
        fontWeight: "bold",
        opacity: 0.6,
      }}
    >
      {Math.floor(Math.random() * 1000000)}
    </div>
  );
};

export const DataWall = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Arrow animation: Slide top to bottom
  const arrowProgress = interpolate(frame, [0, 120], [-200, height + 200]);

  const numbers = React.useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      color: Math.random() > 0.5 ? "#FF0000" : "#C9A84C",
    }));
  }, [width, height]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Shifting Numbers */}
      {numbers.map((num) => (
        <RollingNumber key={num.id} x={num.x} y={num.y} color={num.color} />
      ))}

      {/* Giant Red Arrow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: arrowProgress,
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          filter: "drop-shadow(0 0 30px rgba(255, 0, 0, 0.5))",
        }}
      >
        <div style={{ width: 100, height: 400, backgroundColor: "#FF0000" }} />
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "150px solid transparent",
            borderRight: "150px solid transparent",
            borderTop: "200px solid #FF0000",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
