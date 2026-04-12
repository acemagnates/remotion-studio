import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import React from "react";

const VaultDoor = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotationY = interpolate(frame, [0, 90], [0, Math.PI / 2]);
  const morphProgress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slamFrame = 180;
  const slamSpring = spring({
    frame: frame - slamFrame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const zPos = interpolate(slamSpring, [0, 1], [0, 5]);

  return (
    <group position={[0, 0, zPos]} rotation={[0, rotationY, 0]}>
      {/* Abstract Eye / Vault Morph */}
      <mesh>
        {morphProgress < 0.5 ? (
          <torusGeometry args={[4, 0.2, 16, 100]} />
        ) : (
          <boxGeometry args={[8, 8, 1]} />
        )}
        <meshStandardMaterial 
          color={morphProgress < 0.5 ? "white" : "#C9A84C"} 
          metalness={0.8}
          roughness={0.2}
          wireframe={morphProgress < 0.3}
        />
      </mesh>
      {/* Vault Wheel (Simplified) */}
      {morphProgress > 0.7 && (
        <mesh position={[0, 0, 0.6]}>
          <torusGeometry args={[1.5, 0.3, 16, 50]} />
          <meshStandardMaterial color="#C9A84C" metalness={1} />
        </mesh>
      )}
    </group>
  );
};

export const EyeVaultMorph = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#C9A84C" />
        <VaultDoor />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
