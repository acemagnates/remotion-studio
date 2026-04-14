import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Particles = () => {
  const { width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const count = 20;
  const particles = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 15,
      z: (Math.random() - 0.5) * 5,
      size: Math.random() * 0.1 + 0.05,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  return (
    <group>
      {particles.map((p, i) => {
        const yPos = p.y + (frame * p.speed);
        // Wrap around
        const wrappedY = ((yPos + 10) % 20) - 10;
        
        // ACT 1 & 3: Fade
        const entrance = interpolate(frame, [0, 30], [0, 0.8], { extrapolateRight: "clamp" });
        const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
        const opacity = entrance * exit;

        return (
          <mesh key={i} position={[p.x, wrappedY, p.z]}>
            <sphereGeometry args={[p.size, 16, 16]} />
            <meshBasicMaterial color="#C9A84C" transparent opacity={opacity} />
          </mesh>
        );
      })}
    </group>
  );
};

export const Clip05MGTransparent: React.FC = () => {
  const { width, height } = useVideoConfig();
  
  return (
    <AbsoluteFill>
      <ThreeCanvas width={width} height={height} alpha={true}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Particles />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
