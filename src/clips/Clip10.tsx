import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import * as THREE from "three";

const Shard = ({ delay, frame }: { delay: number; frame: number }) => {
  const { fps } = useVideoConfig();
  
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 60 }
  });

  const rotation = interpolate(frame, [0, 90], [0, Math.PI]);
  const zPosition = interpolate(s, [0, 1], [-10, 15]);
  const opacity = interpolate(s, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 0), []);

  return (
    <mesh 
      position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, zPosition]}
      rotation={[rotation * (Math.random() + 0.5), rotation * (Math.random() + 0.5), 0]}
    >
      <primitive object={geometry} />
      <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} transparent opacity={opacity} />
    </mesh>
  );
};

export const Clip10 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Text motion
  const textS = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 100 } });
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.1]);
  const textOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" });

  // SHARDS (approx 15 shards)
  const shards = useMemo(() => new Array(15).fill(0).map((_, i) => i), []);

  // EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity: exit }}>
      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#C9A84C" />
        {shards.map((i) => (
          <Shard key={i} delay={i * 2} frame={frame} />
        ))}
      </ThreeCanvas>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1 style={{
          fontFamily: "sans-serif",
          fontSize: 160,
          fontWeight: 900,
          color: "#C9A84C",
          textAlign: "center",
          textShadow: "0 0 30px rgba(201,168,76,0.6)",
          transform: `scale(${interpolate(textS, [0, 1], [0.5, 1.2]) * scale}) translateZ(50px)`,
          opacity: textOpacity,
          margin: 0
        }}>
          $1.2<br/>MILLION
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
