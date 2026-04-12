import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { OrbitingCoin } from "./OrbitingCoin";
import { DriftingGoldDust } from "./DriftingGoldDust";

export const Clip01: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Entrance: HEAVY_VAULT_SNAP easing (Custom spring config)
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 1.5,
      stiffness: 150,
    },
    durationInFrames: 80,
  });

  // Zoom-in reveal
  const scale = interpolate(entrance, [0, 1], [1.2, 1]);
  const opacity = interpolate(frame, [0, 40], [0, 1]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BASE LAYER: AI STILL (Obsidian Crown) */}
      <Img
        src={staticFile("assets/clip_01_bg.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
          opacity,
        }}
      />

      {/* DEPTH LAYER: 3D Scene */}
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
          <pointLight position={[5, 5, 5]} intensity={2.0} color="#FFD700" />
          <pointLight position={[-5, -5, 2]} intensity={0.8} color="#FFFFFF" />
          
          {/* Drifting Gold Dust parity with background */}
          <DriftingGoldDust />
          
          {/* Symbolic Orbiting Coin */}
          <OrbitingCoin />
        </ThreeCanvas>
      </div>

      {/* LUXURY OVERLAY: Subtle vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
