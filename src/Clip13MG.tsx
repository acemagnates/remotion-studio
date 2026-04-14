import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, spring } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import * as THREE from "three";

const Scene = () => {
  const { width, height, durationInFrames, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // ACT 1: ENTRANCE
  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  
  // ACT 2: EVOLUTION
  const rotateAngle = interpolate(frame, [0, durationInFrames], [0, Math.PI * 4]);
  const textPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [1, 1.05]);

  // ACT 3: EXIT
  const exitSpring = spring({ 
    frame: frame - (durationInFrames - 15), 
    fps, 
    config: { damping: 12, stiffness: 200 } 
  });
  const collapse = interpolate(exitSpring, [0, 1], [1, 0]);

  return (
    <group scale={entrance * collapse}>
      {/* Ring 1 */}
      <mesh rotation={[rotateAngle, rotateAngle * 0.5, 0]}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshBasicMaterial color="#C9A84C" />
      </mesh>

      {/* Ring 2 */}
      <mesh rotation={[rotateAngle * 0.3, rotateAngle, rotateAngle * 0.7]}>
        <torusGeometry args={[3.5, 0.05, 16, 100]} />
        <meshBasicMaterial color="#C9A84C" />
      </mesh>

      {/* Central glow point if needed, or just let the React text handle it */}
    </group>
  );
};

export const Clip13MG: React.FC = () => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  
  const textPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [1, 1.05]);
  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const exitSpring = spring({ 
    frame: frame - (durationInFrames - 15), 
    fps, 
    config: { damping: 12, stiffness: 200 } 
  });
  const opacity = interpolate(exitSpring, [0, 0.5], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <ThreeCanvas width={width} height={height} alpha={true}>
        <Scene />
      </ThreeCanvas>
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center", 
        opacity: entrance * opacity,
        transform: `scale(${textPulse})`
      }}>
        <h1 style={{ 
          fontFamily: "Inter, sans-serif", 
          fontSize: 120, 
          color: "white", 
          fontWeight: 900,
          textShadow: "0 0 20px rgba(255,255,255,0.4)" 
        }}>
          DATA
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
