import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { ObsidianElement } from "./ObsidianElement";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Entrance animations
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const textOpacity = interpolate(frame, [20, 50], [0, 1]);
  const textScale = interpolate(entrance, [0, 1], [0.8, 1]);

  return (
    <div style={{ flex: 1, backgroundColor: "black", position: "relative" }}>
      {/* 3D Background / Element */}
      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFD700" />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#4a9eff" />
        <ObsidianElement />
      </ThreeCanvas>

      {/* Overlay Text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 200,
            letterSpacing: 25,
            color: "white",
            opacity: textOpacity,
            transform: `scale(${textScale}) translateY(-200px)`,
            fontFamily: "Inter, sans-serif",
          }}
        >
          ACE MAGNATES
        </div>
        
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            letterSpacing: -5,
            color: "#FFD700",
            opacity: textOpacity,
            transform: `scale(${textScale}) translateY(250px)`,
            fontFamily: "Inter, sans-serif",
            textShadow: "0 0 40px rgba(255, 215, 0, 0.3)",
          }}
        >
          AGENTIC CODING
        </div>
      </div>
    </div>
  );
};
