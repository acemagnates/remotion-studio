import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { evolvePath } from "@remotion/paths";
import React from "react";

export const Clip08 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Chart path: Jagged line going downward
  const path = "M 0 400 L 150 450 L 300 350 L 450 600 L 600 550 L 750 900 L 900 850 L 1080 1400";
  const drawProgress = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const { strokeDasharray, strokeDashoffset } = evolvePath(drawProgress, path);

  // ACT 2: HOLD + EVOLUTION
  const driftX = interpolate(frame, [0, durationInFrames], [0, -100]);
  const glowPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.4, 1]);
  const bankruptPulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.8, 1.1]);

  // ACT 3: EXIT (Dissolve to particles)
  const exitFrame = durationInFrames - 15;
  const exit = interpolate(frame, [exitFrame, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  
  // Particles for exit
  const particles = new Array(20).fill(0).map((_, i) => {
      const pExit = Math.max(0, frame - exitFrame);
      const pS = spring({ frame: pExit, fps, delay: i * 2 });
      return (
          <div key={i} style={{
              position: "absolute",
              width: 8, height: 8,
              backgroundColor: "#ff0000",
              borderRadius: "50%",
              opacity: (1 - pS) * (pExit > 0 ? 1 : 0),
              transform: `translate(${(i * 54) % width}px, ${height - pS * 1000}px)`
          }} />
      );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: exit }}>
      {/* Background Grid */}
      <AbsoluteFill style={{
          backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translateX(${driftX}px)`,
          opacity: 0.5
      }} />

      {/* Axis Lines */}
      <div style={{ position: "absolute", bottom: "10%", left: "5%", right: "5%", height: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />
      <div style={{ position: "absolute", top: "10%", bottom: "10%", left: "5%", width: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />

      {/* Red Chart Line */}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", overflow: "visible" }}>
          <path
              d={path}
              fill="none"
              stroke="#ff0000"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              style={{
                  filter: `drop-shadow(0 0 ${15 * glowPulse}px rgba(255,0,0,0.8))`
              }}
          />
      </svg>

      {/* BANKRUPT Text */}
      <div style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          fontFamily: "sans-serif",
          fontSize: 72,
          fontWeight: 900,
          color: "#C9A84C",
          textShadow: "0 0 20px rgba(201,168,76,0.5)",
          transform: `scale(${bankruptPulse})`,
          opacity: interpolate(frame, [25, 35], [0, 1], { extrapolateRight: "clamp" })
      }}>
          BANKRUPT
      </div>

      {/* Exit Particles */}
      {particles}
    </AbsoluteFill>
  );
};
