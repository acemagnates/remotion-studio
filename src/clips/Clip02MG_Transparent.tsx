import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import React, { useMemo } from "react";

const Particle = ({ i, frame, exit }: { i: number; frame: number; exit: number }) => {
  const seed = i * 133.7;
  const angle = (i / 15) * Math.PI * 2;
  const speed = 2 + (i % 5);
  const driftX = Math.cos(angle) * frame * speed;
  const driftY = Math.sin(angle) * frame * speed;
  
  return (
    <div
      style={{
        position: "absolute",
        width: 6,
        height: 6,
        backgroundColor: "#C9A84C",
        borderRadius: "50%",
        opacity: (0.4 + (i % 5) * 0.1) * exit,
        transform: `translate(${width/2 + driftX}px, ${height/2 + driftY}px)`,
        boxShadow: "0 0 10px #C9A84C",
      }}
    />
  );
};

const { width, height } = { width: 1080, height: 1920 }; // Just for the Particle helper if needed, but better passed down

export const Clip02MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1 — ENTRANCE (0.5s = 15 frames): Slide up from mask
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const slideY = interpolate(entrance, [0, 1], [300, 0]);

  // ACT 2 — HOLD + EVOLUTION (1.5s = 45 frames)
  // Digits roll up to $1B
  const rollProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const currentVal = Math.floor(interpolate(rollProgress, [0, 1], [0, 1000000000]));
  const scale = interpolate(frame, [45, 60], [1, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ACT 3 — EXIT (0.5s = 15 frames)
  const exitStart = durationInFrames - 15;
  const exitOpacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Particles fire after count hits $1B (approx frame 45)
  const showParticles = frame > 40;
  const particleFrame = frame - 40;

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      {showParticles && new Array(20).fill(0).map((_, i) => (
        <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
           <div style={{
              width: 10,
              height: 10,
              backgroundColor: "#C9A84C",
              borderRadius: "50%",
              opacity: exitOpacity,
              transform: `translate(${(Math.cos(i) * particleFrame * 10)}px, ${Math.sin(i) * particleFrame * 10}px)`,
              boxShadow: "0 0 15px #C9A84C"
           }} />
        </div>
      ))}

      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center",
        transform: `translateY(${slideY}px) scale(${scale})`,
        opacity: exitOpacity
      }}>
        <div style={{
          overflow: "hidden",
          padding: "20px"
        }}>
          <h1 style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 140,
            fontWeight: 900,
            color: "white",
            margin: 0,
            WebkitTextStroke: "2px #C9A84C",
            textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            textAlign: "center"
          }}>
            ${currentVal.toLocaleString()}
          </h1>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
