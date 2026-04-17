import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

const GoldParticles = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // Burst starts at frame 30 (1s)
  const burstFrame = Math.max(0, frame - 30);
  const burstSpring = spring({
    frame: burstFrame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const particles = Array.from({ length: 40 }).map((_, i) => {
    const angle = (i / 40) * Math.PI * 2 + (i * 123.45);
    const radius = interpolate(burstSpring, [0, 1], [0, 5 + (i % 5) * 2]);
    const z = interpolate(burstSpring, [0, 1], [0, 10 + (i % 3) * 5]);
    const opacity = interpolate(burstSpring, [0, 0.2, 1], [0, 1, 0]);
    
    return (
      <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, z]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={opacity} />
      </mesh>
    );
  });

  return <>{particles}</>;
};

export const Clip05MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (0 - 1s)
  const count = Math.floor(interpolate(frame, [0, 30], [0, 400], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 1, 0.68, 1),
  }));

  // ACT 2: HOLD + EVOLUTION (1 - 2.5s)
  const scale = interpolate(frame, [30, durationInFrames], [1, 1.05], {
    extrapolateLeft: "clamp",
  });

  const flash = interpolate(frame, [30, 35, 45], [1, 2.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textColor = interpolate(frame, [30, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) > 0 ? "#C9A84C" : "#FFFFFF";

  // ACT 3: EXIT (2.5 - 3.0s)
  const exitStart = durationInFrames - 15;
  const exitOpacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, durationInFrames], [1, 0.95], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#0A0A0A",
      opacity: exitOpacity
    }}>
      {/* Background Radial Glow */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.1) 0%, rgba(0,0,0,0) 70%)"
      }} />

      {/* 3D Particles */}
      <ThreeCanvas width={width} height={height} style={{ position: "absolute" }}>
        <GoldParticles />
      </ThreeCanvas>

      {/* Main Counter */}
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center",
        transform: `scale(${scale * exitScale})`
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 220,
          fontWeight: 900,
          color: textColor,
          display: "flex",
          alignItems: "center",
          textShadow: textColor === "#C9A84C" ? `0 0 ${20 * flash}px rgba(201,168,76,0.8)` : "none"
        }}>
          {count}
          <span style={{ fontSize: 120, marginLeft: 10 }}>%</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
