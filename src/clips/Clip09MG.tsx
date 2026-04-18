import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import React from "react";

const GlitchSlice = ({ offset, top, height }: { offset: number; top: number; height: number }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: 0,
        width: "100%",
        height: `${height}%`,
        overflow: "hidden",
        transform: `translateX(${offset}px)`,
      }}
    >
      <div style={{ position: "absolute", top: `-${top * 19.2}px`, left: offset, width: 1080, height: 1920 }}>
         {/* Content to be glitched will be cloned here */}
      </div>
    </div>
  );
};

export const Clip09MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 12 } });
  
  // Glitch intensity
  const intensity = interpolate(frame, [0, 15, durationInFrames], [0, 1, 1]);
  
  // Scales up aggressively
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.5]);

  // ACT 3: CRT EXIT
  const exitFrame = durationInFrames - 10;
  const exit = interpolate(frame, [exitFrame, durationInFrames], [0, 1], { extrapolateLeft: "clamp" });
  const crtHeight = interpolate(exit, [0, 1], [1, 0.01]);
  const crtWidth = interpolate(exit, [0, 0.5, 1], [1, 1.1, 0]);

  const slices = new Array(8).fill(0).map((_, i) => ({
    top: i * 12.5,
    height: 12.5,
    offset: Math.sin(frame * 0.8 + i) * 40 * intensity * (Math.random() > 0.7 ? 2 : 1)
  }));

  const renderContent = (offsetX: number = 0) => (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0A0A0A" }}>
      {/* Eye Icon (Surrogate: SVG) */}
      <svg width="600" height="400" viewBox="0 0 200 120" style={{ transform: `scale(${scale})`, opacity: entrance }}>
        <path
          d="M10 60 Q 100 0 190 60 Q 100 120 10 60 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="8"
        />
        <circle cx="100" cy="60" r="30" fill="#FFFFFF" />
        <circle cx="100" cy="60" r="12" fill="#0A0A0A" />
      </svg>
      
      {/* Scan lines */}
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(rgba(255,255,255,0.05) 0px, transparent 2px, transparent 4px)", pointerEvents: "none" }} />
      
      {/* RGB Offset (Simulated with text shadows or extra layers) */}
      <div style={{ position: "absolute", inset: 0, boxShadow: `inset 0 0 100px rgba(255,255,255,${intensity * 0.1})` }} />
    </AbsoluteFill>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden", transform: `scaleX(${crtWidth}) scaleY(${crtHeight})` }}>
      {slices.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: 0,
            width: "100%",
            height: `${s.height}%`,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: `-${s.top}%`, left: s.offset, width: "100%", height: "800%" }}>
            {renderContent(s.offset)}
          </div>
        </div>
      ))}
      
      {/* Extra RGB layer */}
      {Math.random() > 0.8 && (
        <AbsoluteFill style={{ mixBlendMode: "screen", opacity: 0.3 * intensity, backgroundColor: "#F00", transform: "translateX(10px)" }} />
      )}
      {Math.random() > 0.8 && (
        <AbsoluteFill style={{ mixBlendMode: "screen", opacity: 0.3 * intensity, backgroundColor: "#00F", transform: "translateX(-10px)" }} />
      )}
    </AbsoluteFill>
  );
};
