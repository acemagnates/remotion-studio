import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { DriftingGoldDust } from "./DriftingGoldDust";

export const Clip08: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Entrance Reveal Animation
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 15,
      mass: 0.8,
      stiffness: 100,
    },
    durationInFrames: 90,
  });

  // Reveal transforms
  const opacity = interpolate(frame, [0, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  
  // Subtle Zoom-in motion
  const scale = interpolate(entrance, [0, 1], [1.1, 1]);
  
  // Spotlight effect (CSS radial gradient) overlay
  const spotlightOpacity = interpolate(frame, [30, 90], [0, 0.4], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BASE LAYER: AI STILL */}
      <Img
        src={staticFile("assets/clip_08_bg.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity,
          transform: `scale(${scale})`,
        }}
      />

      {/* DEPTH LAYER: DRIFTING GOLD DUST */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <ThreeCanvas width={width} height={height}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#FFD700" />
          <pointLight position={[-5, -5, 2]} intensity={0.5} color="#FFFFFF" />
          <DriftingGoldDust />
        </ThreeCanvas>
      </div>

      {/* VIGNETTE & SPOTLIGHT OVERLAY for Dark Luxury feel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 50% 30%, transparent 20%, rgba(0,0,0,0.8) 100%)`,
          opacity: spotlightOpacity,
          pointerEvents: "none",
        }}
      />

      {/* DISRUPTION TEXT (Minimalist labels if needed, or just the visual) */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "rgba(255, 215, 0, 0.6)",
          fontSize: 24,
          letterSpacing: 20,
          fontWeight: 200,
          fontFamily: "Inter, sans-serif",
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        DISRUPTION
      </div>
    </div>
  );
};
