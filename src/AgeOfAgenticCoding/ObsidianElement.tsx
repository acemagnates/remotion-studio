import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const ObsidianElement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations driven by useCurrentFrame()
  const rotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);
  const bounce = Math.sin(frame / 30) * 0.1;

  return (
    <group rotation={[Math.PI / 6, rotationY, 0]} position={[0, bounce, 0]}>
      {/* Obsidian Core */}
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.05} 
          metalness={0.2} 
          envMapIntensity={1}
        />
      </mesh>

      {/* Gold Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color="#FFD700" 
          roughness={0.1} 
          metalness={1} 
          envMapIntensity={2}
        />
      </mesh>

      {/* Gold Details */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial 
          color="#FFD700" 
          wireframe
          transparent
          opacity={0.3}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </group>
  );
};
