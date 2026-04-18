import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React from "react";

export const Clip05MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1 — ENTRANCE (0.5s = 15 frames)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  
  const lineDraw = interpolate(frame, [0, 15], [0, 800], { extrapolateRight: "clamp" });
  const panelDrop = interpolate(entrance, [0, 1], [100, 0]);
  const textFade = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ACT 2 — HOLD + EVOLUTION (1.5s = 45 frames)
  const letterSpacing = interpolate(frame, [0, durationInFrames], [0.1, 0.4]);
  const panelDriftX = interpolate(frame, [0, durationInFrames], [0, 10]);

  // ACT 3 — EXIT (0.5s = 15 frames)
  const exitStart = durationInFrames - 15;
  const lineRetract = interpolate(frame, [exitStart, durationInFrames], [800, 0], { extrapolateLeft: "clamp" });
  const exitOpacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      <div style={{
        position: "absolute",
        bottom: "15%",
        left: "10%",
        opacity: exitOpacity,
        transform: `translateY(${panelDrop}px) translateX(${panelDriftX}px)`
      }}>
        {/* Smoked Glass Panel */}
        <div style={{
          backgroundColor: "rgba(10, 10, 10, 0.85)",
          padding: "30px 60px",
          borderTop: "1px solid #C9A84C",
          width: "max-content",
          position: "relative"
        }}>
          {/* Gold Glowing Line */}
          <div style={{
            position: "absolute",
            top: -1,
            left: 0,
            width: (frame >= exitStart ? lineRetract : lineDraw),
            height: 2,
            backgroundColor: "#C9A84C",
            boxShadow: "0 0 10px #C9A84C"
          }} />
          
          <h2 style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 48,
            fontWeight: 700,
            color: "white",
            margin: 0,
            opacity: textFade,
            letterSpacing: `${letterSpacing}em`,
            textTransform: "uppercase"
          }}>
            TOP-SECRET MILITARY LAB
          </h2>
        </div>
      </div>
    </AbsoluteFill>
  );
};
