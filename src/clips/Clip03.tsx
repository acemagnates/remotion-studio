import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import React from "react";

export const Clip03 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Counter Scroll)
  const vaultSlam = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  });
  
  const rawCounter = interpolate(vaultSlam, [0, 1], [1, 14]);
  const currentNumber = Math.floor(rawCounter);
  
  // ACT 2: HOLD + EVOLUTION
  const glow = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.8, 1.2]);
  const scanlinePos = (frame * 2.5) % 100;
  
  // Word typing
  const word = "CONSECUTIVE";
  const typeProgress = interpolate(frame, [15, 45], [0, word.length], { extrapolateRight: "clamp" });
  const typedWord = word.substring(0, Math.floor(typeProgress));
  
  // ACT 3: EXIT (Split horizontally)
  const exit = spring({ frame: frame - (durationInFrames - 15), fps, config: { damping: 10, stiffness: 200 } });
  const splitOffset = interpolate(exit, [0, 1], [0, 600]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Scan lines */}
      <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none", opacity: 0.1 }}>
        <div style={{
          position: "absolute",
          top: `${scanlinePos}%`,
          width: "100%",
          height: "2px",
          backgroundColor: "#FFF",
          boxShadow: "0 0 10px #FFF"
        }} />
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(201,168,76,0.1) 5px)"
        }} />
      </AbsoluteFill>

      {/* Main Content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* Number 14 */}
        <div style={{
          display: "flex",
          transform: `scale(${1 + (glow - 1) * 0.05})`,
          opacity: 1 - exit
        }}>
          <div style={{
            fontFamily: "sans-serif",
            fontSize: 360,
            fontWeight: 900,
            color: "#C9A84C",
            textShadow: `0 0 ${20 * glow}px rgba(201,168,76,0.6)`,
            transform: `translateX(-${splitOffset}px)`
          }}>
            {currentNumber}
          </div>
        </div>

        {/* Word CONSECUTIVE */}
        <div style={{
          fontFamily: "monospace",
          fontSize: 48,
          color: "#FFF",
          letterSpacing: "0.2em",
          marginTop: -20,
          opacity: 1 - exit,
          transform: `translateX(${splitOffset}px)`
        }}>
          {typedWord}
          <span style={{ opacity: (frame % 10 < 5) ? 1 : 0 }}>_</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
