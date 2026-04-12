import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";

export const GoldDustParticles = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < 150; i++) {
        data.push({
            position: [
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 4,
            ] as [number, number, number],
            speed: Math.random() * 0.005,
            size: Math.random() * 0.04 + 0.02,
        });
    }
    return data;
  }, []);

  return (
    <AbsoluteFill>
      <ThreeCanvas width={width} height={height} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        {particles.map((p, i) => (
          <mesh
            key={i}
            position={[
              p.position[0],
              p.position[1] + frame * p.speed,
              p.position[2]
            ]}
          >
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial color="#C9A84C" />
          </mesh>
        ))}
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
