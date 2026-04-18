import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { useMemo } from "react";

const ParticleSystem = ({ count, opacity }: { count: number; opacity: number }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        Math.random() * 0.1
      ),
      size: Math.random() * 0.1 + 0.05,
    }));
  }, [count]);

  return (
    <group>
      {particles.map((p, i) => {
        const x = p.position.x + p.velocity.x * frame;
        const y = p.position.y + p.velocity.y * frame;
        const z = p.position.z + p.velocity.z * frame;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[p.size, 16, 16]} />
            <meshStandardMaterial
              color="#C9A84C"
              emissive="#C9A84C"
              emissiveIntensity={2}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export const Clip01MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (0 - 30 frames approx 1s)
  const slam = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  });

  // Digits spin upward aggressively
  const counterVal = Math.floor(
    interpolate(slam, [0, 1], [0, 4], {
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    })
  );

  // ACT 2: HOLD + EVOLUTION
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08]);
  const particleOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ACT 3: EXIT
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  const driftUp = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [0, -100],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exit, transform: `translateY(${driftUp}px)` }}>
      {/* 3D Particle Burst */}
      <ThreeCanvas width={width} height={height} alpha={true}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFFFFF" />
        <ParticleSystem count={40} opacity={particleOpacity * exit} />
      </ThreeCanvas>

      {/* Main Number */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 400,
            color: "#FFFFFF",
            fontWeight: 900,
            margin: 0,
            transform: `scale(${slam * scale})`,
            textShadow: `
              0 0 20px rgba(201, 168, 76, 0.8),
              0 0 40px rgba(201, 168, 76, 0.4),
              0 4px 30px rgba(0, 0, 0, 0.5)
            `,
            WebkitTextStroke: "4px #C9A84C",
          }}
        >
          {counterVal}
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
