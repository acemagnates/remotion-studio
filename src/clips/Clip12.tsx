import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import React from "react";

export const Clip12 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Slide up)
  const cardS = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  
  const cardY = interpolate(cardS, [0, 1], [1500, 500]);
  
  // ACT 2: HOLD + EVOLUTION
  const driftY = interpolate(frame, [0, durationInFrames], [0, -40]);
  const text = "NET REVENUE: -84%";
  const typeProgress = interpolate(frame, [15, 60], [0, text.length], { extrapolateRight: "clamp" });
  const typedText = text.substring(0, Math.floor(typeProgress));
  
  const glow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.3, 0.8]);

  // ACT 3: EXIT (Drop down)
  const exitS = spring({ frame: frame - (durationInFrames - 15), fps });
  const exitY = interpolate(exitS, [0, 1], [0, 1500]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Blurred bg */}
      <AbsoluteFill style={{
          background: "radial-gradient(circle, #1a1a1a 0%, #000 100%)",
          filter: "blur(20px)",
          opacity: 0.6
      }} />

      <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: `translateX(-50%) translateY(${cardY + driftY + exitY}px)`,
          width: 800,
          height: 600,
          background: "rgba(15, 15, 15, 0.95)",
          border: "1px solid #C9A84C",
          borderRadius: 12,
          boxShadow: `0 0 40px rgba(0,0,0,0.8), 0 0 20px rgba(201,168,76,${0.1 + glow * 0.1})`,
          padding: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
      }}>
          {/* Card Texture Overlay */}
          <div style={{
              position: "absolute",
              inset: 0,
              opacity: 0.1,
              backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-leather.png')",
              pointerEvents: "none"
          }} />

          <div style={{
              fontFamily: "monospace",
              fontSize: 64,
              fontWeight: 900,
              color: "#FFF",
              textAlign: "center",
              lineHeight: 1.4,
              letterSpacing: "0.05em"
          }}>
              {typedText}
              <span style={{ opacity: (frame % 10 < 5) ? 1 : 0 }}>|</span>
          </div>

          {/* Highlight -84% */}
          {typeProgress > 13 && (
              <div style={{
                  position: "absolute",
                  bottom: "15%",
                  width: "80%",
                  height: 2,
                  backgroundColor: "#C9A84C",
                  boxShadow: `0 0 15px rgba(201,168,76,${glow})`,
                  opacity: interpolate(frame, [50, 60], [0, 1])
              }} />
          )}
      </div>
    </AbsoluteFill>
  );
};
