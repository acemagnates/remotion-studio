import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { useMemo } from "react";

const BurstParticles = ({ frame }: { frame: number }) => {
  const { fps } = useVideoConfig();
  const particleCount = 40;
  
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const velocity = 0.5 + Math.random() * 1.5;
        const x = Math.sin(phi) * Math.cos(theta) * velocity;
        const y = Math.sin(phi) * Math.sin(theta) * velocity;
        const z = Math.cos(phi) * velocity;
      data.push({ x, y, z, size: Math.random() * 0.05 + 0.02 });
    }
    return data;
  }, []);

  const burstFrame = 15; // When the number hits 28
  const burstProgress = Math.max(0, frame - burstFrame);
  const burstSpring = spring({ frame: burstProgress, fps, config: { damping: 20, stiffness: 100 } });

  return (
    <group>
      {particles.map((p, i) => {
        const drift = burstProgress * 0.01;
        const opacity = interpolate(burstProgress, [0, 60], [1, 0], { extrapolateRight: "clamp" });
        
        return (
          <mesh key={i} position={[p.x * burstSpring * 10, p.y * burstSpring * 10, p.z * burstSpring * 10 + drift]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial color="#C9A84C" transparent opacity={opacity} />
          </mesh>
        );
      })}
    </group>
  );
};

export const Clip01 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (Counter Scroll)
  const entrance = interpolate(frame, [0, 15], [0, 28], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  
  const blur = interpolate(frame, [0, 7, 15], [20, 10, 0], { extrapolateRight: "clamp" });
  
  // ACT 2: HOLD + EVOLUTION
  const lockSpring = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 200 } });
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  
  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const currentNumber = Math.floor(entrance);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      {/* Background ThreeJS Burst */}
      <ThreeCanvas width={width} height={height} style={{ position: "absolute" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <BurstParticles frame={frame} />
      </ThreeCanvas>

      {/* Vignette */}
      <AbsoluteFill style={{
        background: "radial-gradient(circle, transparent 30%, rgba(0,0,0,1) 100%)",
        pointerEvents: "none"
      }} />

      {/* Number Display */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{
          fontFamily: "sans-serif",
          fontSize: 320,
          fontWeight: 900,
          color: "#FFF",
          filter: `blur(${blur}px)`,
          transform: `scale(${interpolate(lockSpring, [0, 1], [0.8, 1]) * scale})`,
          textShadow: "0 0 40px rgba(201,168,76,0.3)"
        }}>
          {currentNumber}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
