import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import * as THREE from "three";

const Debris = ({ count = 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const shatterFrame = 24;
  const shatterSpring = spring({
    frame: frame - shatterFrame,
    fps,
    config: { damping: 20, stiffness: 50 },
  });

  const fragments = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      pos: new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, 0),
      vel: new THREE.Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4 - 3, (Math.random() - 0.5) * 4),
    }));
  }, [count]);

  return (
    <group>
      {fragments.map((f, i) => {
        const offset = f.vel.clone().multiplyScalar(shatterSpring);
        const position = f.pos.clone().add(offset);
        return (
          <mesh key={i} position={[position.x, position.y, position.z]}>
            <dodecahedronGeometry args={[0.08]} />
            <meshBasicMaterial color="#888888" />
          </mesh>
        );
      })}
    </group>
  );
};

export const Clip15: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: CRUSH
  const blockFall = spring({
    frame,
    fps,
    config: { mass: 5, damping: 20, stiffness: 100 },
  });
  const blockY = interpolate(blockFall, [0, 1], [10, 0]);

  // ACT 2: DRIFT + PUSH
  const camZ = interpolate(frame, [24, durationInFrames], [5, 2]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <ThreeCanvas width={width} height={height} camera={{ position: [0, 0, camZ] }}>
        <ambientLight intensity={0.5} />
        <mesh position={[0, blockY, 0]}>
          <boxGeometry args={[3, 1.5, 1.5]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <Debris />
      </ThreeCanvas>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: frame < 24 ? 1 : 0 }}>
        <div style={{ width: 220, height: 220, borderRadius: "50%", background: "#FFF", boxShadow: "0 0 40px #FFF" }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ 
        backgroundColor: "#000", 
        opacity: interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1], { extrapolateLeft: "clamp" }) 
      }} />
    </AbsoluteFill>
  );
};
