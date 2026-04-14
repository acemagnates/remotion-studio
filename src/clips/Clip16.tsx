import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";

export const Clip16 = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (Screen tear)
  const intensity = interpolate(frame, [0, 15, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  const glitchSlices = new Array(12).fill(0).map((_, i) => {
    const yStart = (i * 100) / 12;
    const yEnd = ((i + 1) * 100) / 12;
    const offset = Math.sin(frame * 0.5 + i) * 50 * intensity * (Math.random() > 0.8 ? 2 : 1);
    const rOffset = Math.cos(frame * 0.8 + i) * 10 * intensity;
    const cOffset = -rOffset;

    return (
      <div key={i} style={{
        position: "absolute",
        top: `${yStart}%`,
        width: "100%",
        height: `${yEnd - yStart}%`,
        overflow: "hidden",
        transform: `translateX(${offset}px)`
      }}>
        {/* RGB Channels */}
        <AbsoluteFill style={{ 
            backgroundColor: "#000",
            transform: `translateX(${rOffset}px)`
        }}>
           <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(255,0,0,0.5)", opacity: intensity * 0.3 }} />
        </AbsoluteFill>
        <AbsoluteFill style={{ 
            mixBlendMode: "screen",
            transform: `translateX(${cOffset}px)`
        }}>
           <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(0,255,255,0.5)", opacity: intensity * 0.3 }} />
        </AbsoluteFill>

        {/* Static Noise Overlay */}
        <AbsoluteFill style={{
          backgroundImage: "url('https://media.giphy.com/media/oEI9uWUicKgR0ZByQD/giphy.gif')", // Placeholder for noise if allowed, else use CSS
          backgroundSize: "cover",
          opacity: 0.1 * intensity,
          mixBlendMode: "overlay"
        }} />
      </div>
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
        {glitchSlices}
        
        {/* Rapid white flashes */}
        {frame % 4 === 0 && (
            <AbsoluteFill style={{ backgroundColor: "#FFF", opacity: 0.05 * intensity }} />
        )}

        {/* Scan lines */}
        <AbsoluteFill style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 3px)",
            pointerEvents: "none"
        }} />
    </AbsoluteFill>
  );
};
