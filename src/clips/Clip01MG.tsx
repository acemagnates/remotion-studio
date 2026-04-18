import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import React from "react";

export const Clip01MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1 — ENTRANCE (0.5s = 15 frames)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // ACT 2 — HOLD + EVOLUTION
  const driftRotationX = interpolate(frame, [0, durationInFrames], [15, 22]);
  const driftRotationY = interpolate(frame, [0, durationInFrames], [-8, 8]);
  const bloomPulse = interpolate(
    Math.sin((frame / fps) * 3),
    [-1, 1],
    [0.9, 1.1]
  );

  // ACT 3 — EXIT (0.5s = 15 frames)
  const exitStart = durationInFrames - 15;
  const exitScale = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const exitOpacity = interpolate(
    frame,
    [exitStart + 5, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Scale: 300% to 100% (Slam) and then 100% to 300% (Exit)
  const finalScale = interpolate(entrance, [0, 1], [3, 1]) * (frame >= exitStart ? exitScale : 1);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Background 3D elements */}
      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <group rotation={[Math.PI / 10, 0, 0]}>
           <mesh position={[0, 0, -5]}>
             <boxGeometry args={[10, 10, 0.1]} />
             <meshStandardMaterial color="#1c1c1c" wireframe opacity={0.4} transparent />
           </mesh>
        </group>
      </ThreeCanvas>

      {/* Foreground 3D Text via CSS (best for bloom/neon) */}
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center",
        perspective: "1200px" 
      }}>
        <div style={{
          transform: `scale(${finalScale}) rotateX(${driftRotationX}deg) rotateY(${driftRotationY}deg)`,
          opacity: exitOpacity,
        }}>
          <h1 style={{
            fontFamily: "sans-serif",
            fontSize: 120,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textShadow: `
              0 0 ${20 * bloomPulse}px rgba(201, 168, 76, 1),
              0 0 ${50 * bloomPulse}px rgba(201, 168, 76, 0.6),
              0 0 ${80 * bloomPulse}px rgba(201, 168, 76, 0.3),
              0 15px 40px rgba(0, 0, 0, 1)
            `
          }}>
            HIGH SCHOOL<br/>DROPOUT
          </h1>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
