import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip04MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0.5–1.0s)
  const gridOpacity = interpolate(frame, [0, 30], [0, 0.15], { extrapolateRight: "clamp" });
  
  // Line drawing progress
  const lineProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20 },
  });

  // Sharp plunge path
  // Starts at y=600, goes slightly up/down, then plunges at frame ~45
  const path = "M -50 800 L 200 750 L 400 820 L 500 700 L 600 1400 L 800 1600 L 1130 1550";
  
  // ACT 2: HOLD + EVOLUTION (1.5–2.5s)
  const parallax = interpolate(frame, [0, durationInFrames], [1, 1.1], { extrapolateRight: "clamp" });
  const shimmer = interpolate(Math.sin(frame / 15), [-1, 1], [0.6, 1]);

  // ACT 3: EXIT (0.3–0.5s)
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Floating particles for exit dissolve
  const particles = new Array(20).fill(0).map((_, i) => {
    const move = interpolate(frame, [durationInFrames - 20, durationInFrames], [0, 100 + i * 5]);
    const op = interpolate(frame, [durationInFrames - 20, durationInFrames - 5], [0, 1], { extrapolateRight: 'clamp' });
    return (
      <div key={i} style={{
        position: 'absolute',
        width: 4, height: 4,
        backgroundColor: '#C9A84C',
        borderRadius: '50%',
        opacity: op * exit,
        transform: `translate(${(i * 54) % 1080}px, ${(i * 96) % 1920 - move}px)`
      }} />
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", overflow: 'hidden' }}>
      {/* Grid lines */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%', opacity: gridOpacity,
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      <AbsoluteFill style={{ transform: `scale(${parallax})`, opacity: exit }}>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ filter: 'drop-shadow(0 0 15px rgba(201,168,76,0.4))' }}>
          <path
            d={path}
            fill="none"
            stroke="#C9A84C"
            strokeWidth="12"
            strokeDasharray="4000"
            strokeDashoffset={4000 * (1 - lineProgress)}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 ${10 * shimmer}px #C9A84C)` }}
          />
          
          {/* Red data point pulse at bottom */}
          {lineProgress > 0.8 && (
             <circle
               cx="600"
               cy="1400"
               r={interpolate(Math.sin(frame/10), [-1, 1], [15, 25])}
               fill="#FF3333"
               style={{ opacity: 0.8, filter: 'blur(8px)' }}
             />
          )}
        </svg>
      </AbsoluteFill>

      {particles}

      {/* Axis Labels */}
      <AbsoluteFill style={{ padding: 60, justifyContent: 'flex-end', opacity: gridOpacity }}>
         <div style={{ color: '#C9A84C', fontFamily: 'monospace', fontSize: 24 }}>TERMINAL ERROR: MARGIN_CRUSH_DETECTED</div>
         <div style={{ color: '#FFF', fontFamily: 'monospace', fontSize: 18, opacity: 0.5 }}>STATUS: REVOKED</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
