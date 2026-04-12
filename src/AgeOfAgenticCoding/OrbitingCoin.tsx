import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const OrbitingCoin: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow orbital rotation (360 degrees over 600 frames = 10 seconds)
  const orbitRotation = interpolate(frame, [0, 600], [0, Math.PI * 2]);
  
  // Coin spin on its own axis
  const selfRotation = interpolate(frame, [0, 150], [0, Math.PI * 2]);
  
  // Subtle hovering
  const hover = Math.sin(frame / 40) * 0.2;

  return (
    <group rotation={[Math.PI / 8, orbitRotation, 0]}>
      <mesh 
        position={[3, hover, 0]} 
        rotation={[Math.PI / 2, selfRotation, 0]}
      >
        {/* Coin shape using a thin cylinder */}
        <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
        
        {/* Obsidian Core with Gold Edge Material */}
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.05} 
          metalness={0.8}
        />
        
        {/* Gold Rim/Edge (Visual representation) */}
        <mesh>
          <torusGeometry args={[0.5, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color="#FFD700" 
            metalness={1} 
            roughness={0.1} 
            emissive="#FFD700"
            emissiveIntensity={0.2}
          />
        </mesh>
      </mesh>
    </group>
  );
};
