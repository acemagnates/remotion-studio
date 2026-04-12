import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React, { useMemo } from "react";

const Particle = ({ delay, color, angle, distance }: { delay: number; color: string; angle: number; distance: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const particleFrame = frame - 30 - delay;
  if (particleFrame < 0) return null;

  const progress = spring({
    frame: particleFrame,
    fps,
    config: { damping: 50, stiffness: 100 },
  });

  const opacity = interpolate(progress, [0, 0.8, 1], [1, 1, 0]);
  const currentDistance = progress * distance;
  
  const x = Math.cos(angle) * currentDistance;
  const y = Math.sin(angle) * currentDistance;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 4,
        height: 12,
        backgroundColor: color,
        borderRadius: 2,
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}rad)`,
        opacity,
        boxShadow: `0 0 10px ${color}`,
      }}
    />
  );
};

export const SmartestBuilding = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const impactFrame = 30; // 0.5s at 60fps

  // Z-axis slam spring
  const slamProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  // Scale from large (2.0) to normal (1.0)
  const scale = interpolate(slamProgress, [0, 1], [5, 1], {
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [0, 5], [0, 1]);

  // Particles config
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      angle: (i / 40) * Math.PI * 2 + (Math.random() - 0.5) * 0.5,
      distance: 200 + Math.random() * 400,
      delay: Math.random() * 5,
      color: i % 2 === 0 ? "#C9A84C" : "#E5D19A",
    }));
  }, []);

  // Glow pulse
  const glowIntensity = interpolate(
    frame,
    [impactFrame, impactFrame + 10, impactFrame + 30],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 24px backdrop blur (applied via a pseudo-layer if needed, but the demand says 'deep smoked obsidian background with subtle 24px backdrop blur') */}
      {/* Since the bg is solid, backdrop blur won't reveal much unless there's something behind. We'll simulate the haze. */}
      <AbsoluteFill 
        style={{
          background: "radial-gradient(circle at center, #1A1A1A 0%, #0A0A0A 100%)",
          backdropFilter: "blur(24px)",
        }} 
      />

      {/* 1px Glowing Gold Bevel */}
      <div
        style={{
          position: "absolute",
          inset: 40,
          border: "1px solid #C9A84C",
          boxShadow: "inset 0 0 20px rgba(201, 168, 76, 0.2), 0 0 15px rgba(201, 168, 76, 0.3)",
          pointerEvents: "none",
        }}
      />

      {/* Particles Burst */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Main Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
          textShadow: `0 0 ${glowIntensity * 40}px #C9A84C`,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 120,
            fontWeight: "900",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
          }}
        >
          SMARTEST
        </span>
        <span
          style={{
            color: "white",
            fontSize: 120,
            fontWeight: "900",
            fontFamily: "Inter, sans-serif",
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
          }}
        >
          BUILDING
        </span>
      </div>
    </AbsoluteFill>
  );
};
