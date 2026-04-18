import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import * as THREE from "three";

const DustCloud = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const particles = useMemo(() => {
    return new Array(30).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 10
      ),
      size: Math.random() * 0.04 + 0.01,
      parallax: Math.random() * 2 + 0.5
    }));
  }, []);

  return (
    <ThreeCanvas width={width} height={height}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      {particles.map((p, i) => {
        const driftX = Math.sin(frame * 0.008 + i) * 0.3;
        const driftY = (frame * 0.006 * p.parallax) % 12 - 6;
        const pos: [number, number, number] = [
          p.position.x + driftX,
          p.position.y - driftY,
          p.position.z + (frame * 0.01) // slow drift forward
        ];
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[p.size, 12, 12]} />
            <meshStandardMaterial 
              color="#C9A84C" 
              emissive="#C9A84C" 
              emissiveIntensity={2} 
              transparent 
              opacity={0.9}
            />
          </mesh>
        );
      })}
    </ThreeCanvas>
  );
};

export const Clip16MG_Transparent = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }) 
                  * interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
            <AbsoluteFill style={{ opacity }}>
                <DustCloud />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
