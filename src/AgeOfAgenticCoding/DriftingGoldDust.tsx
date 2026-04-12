import React, { useMemo } from "react";
import { useCurrentFrame } from "remotion";

export const DriftingGoldDust: React.FC = () => {
  const frame = useCurrentFrame();

  const particleCount = 150;
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map(() => ({
      x: (Math.random() - 0.5) * 15,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 10,
      size: Math.random() * 0.03 + 0.01,
      speed: Math.random() * 0.02 + 0.01,
      driftX: (Math.random() - 0.5) * 0.01,
    }));
  }, []);

  return (
    <group>
      {particles.map((p, i) => {
        // Continuous upward/drifting motion
        const currentY = ((p.y + frame * p.speed + 10) % 20) - 10;
        const currentX = p.x + frame * p.driftX;
        
        return (
          <mesh key={i} position={[currentX, currentY, p.z]}>
            <sphereGeometry args={[p.size, 6, 6]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700" 
              emissiveIntensity={0.8} 
              metalness={1} 
              roughness={0} 
            />
          </mesh>
        );
      })}
    </group>
  );
};
