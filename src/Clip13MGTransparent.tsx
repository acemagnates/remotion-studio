import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import * as THREE from "three";

export const Clip13MGTransparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (0.0 - 0.8s)
  const entranceOpacity = interpolate(frame, [0, 24], [0, 1]);
  const textOpacity = interpolate(frame, [12, 24], [0, 1]);

  // ACT 2: HOLD + EVOLUTION
  // Rotation: frame * 0.027 rad (approx 0.8 rad/s at 30fps)
  const rotationY = frame * 0.027;

  // Pulse emissive
  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.7, 1]);

  // ACT 3: EXIT (3.0 - 3.5s)
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  // Particles
  const particles = useMemo(() => {
    return new Array(10).fill(0).map((_, i) => ({
      x: (Math.sin(i * 99) * 0.5 + 0.5) * width,
      yStart: 1920 + (Math.cos(i * 88) * 0.5 + 0.5) * 500,
      speed: 1 + Math.random() * 2,
      size: 2 + Math.random() * 3,
    }));
  }, [width]);

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <ThreeCanvas
        width={width}
        height={height}
        alpha={true}
        camera={{ position: [0, 0, 200], fov: 45 }}
      >
        <group rotation={[Math.PI * 0.11, 0, 0]} position={[0, -200, 0]}>
          <mesh rotation={[0, rotationY, 0]}>
            <torusGeometry args={[60, 1.5, 32, 100]} />
            <meshBasicMaterial
              color="#C9A84C"
              transparent
              opacity={entranceOpacity * pulse}
            />
          </mesh>
        </group>
      </ThreeCanvas>

      {/* Center Text */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: "15%", // Adjusting for the ring being in lower third
        }}
      >
        <div
          style={{
            color: "#FFF",
            fontSize: 100,
            fontWeight: 900,
            opacity: textOpacity,
            letterSpacing: "0.2em",
          }}
        >
          ANYONE
        </div>
      </AbsoluteFill>

      {/* Particles */}
      {particles.map((p, i) => {
        const y = p.yStart - frame * p.speed;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: "#C9A84C",
              opacity: entranceOpacity * 0.6,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
