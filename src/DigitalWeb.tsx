import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const WebContent = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const branchProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20 },
  });

  const nodes = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ),
    }));
  }, []);

  const rotationY = frame * 0.005;
  const driftY = Math.sin(frame * 0.02) * 0.2;

  return (
    <group rotation={[0, rotationY, 0]} position={[0, driftY, 0]}>
      {/* Central Node */}
      <mesh position={[0, interpolate(entrance, [0, 1], [5, 0]), 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={2} />
      </mesh>

      {/* Branching Nodes & Lines */}
      {nodes.map((node, i) => {
        const linePos = node.pos.clone().multiplyScalar(branchProgress);
        return (
          <React.Fragment key={i}>
            <mesh position={linePos}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#C9A84C" />
            </mesh>
            <line>
              <bufferGeometry
                attach="geometry"
                onUpdate={(self) =>
                  self.setFromPoints([new THREE.Vector3(0, 0, 0), linePos])
                }
              />
              <lineBasicMaterial attach="material" color="#C9A84C" transparent opacity={0.4} />
            </line>
          </React.Fragment>
        );
      })}
    </group>
  );
};

export const DigitalWeb = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill>
      <ThreeCanvas width={width} height={height} alpha={true}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#C9A84C" />
        <WebContent />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
