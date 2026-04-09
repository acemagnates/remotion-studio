import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Create a subtle grid of dots that moves slowly
  const dots = [];
  const spacing = 100;
  const dotSize = 2;

  for (let x = 0; x < width + spacing; x += spacing) {
    for (let y = 0; y < height + spacing; y += spacing) {
      // Offset based on frame
      const offsetX = (frame * 0.5) % spacing;
      const offsetY = (frame * 0.2) % spacing;

      dots.push(
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x - offsetX,
            top: y - offsetY,
            width: dotSize,
            height: dotSize,
            backgroundColor: "rgba(0, 255, 150, 0.15)",
            borderRadius: "50%",
            boxShadow: "0 0 5px rgba(0, 255, 150, 0.4)",
          }}
        />
      );
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: "#050505",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(20, 40, 30, 1) 0%, rgba(5, 5, 5, 1) 100%)",
        }}
      />
      {dots}
    </div>
  );
};
