import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import React, { useMemo } from "react";
import * as THREE from "three";

const Ring = ({ rotation, rotateZ }: { rotation: [number, number, number], rotateZ: number }) => {
    return (
        <mesh rotation={[rotation[0], rotation[1], rotateZ]}>
            <torusGeometry args={[5, 0.05, 16, 100]} />
            <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={2} />
        </mesh>
    );
};

export const Clip20 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const entrance = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const ringSpeed = interpolate(frame, [0, 30, durationInFrames], [20, 5, 2]);

  // Rings rotation
  const angle = (frame * ringSpeed * 0.01);
  
  // ACT 2: HOLD + EVOLUTION
  const glow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1.5]);
  const pushIn = interpolate(frame, [0, durationInFrames], [1, 1.03]);

  // ACT 3: EXIT (Collapse)
  const exitS = spring({ frame: frame - (durationInFrames - 15), fps });
  const collapse = interpolate(exitS, [0, 1], [1, 0]);
  const opacity = interpolate(exitS, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity }}>
        <ThreeCanvas width={width} height={height}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#C9A84C" />
            
            <group scale={collapse}>
                <Ring rotation={[Math.PI / 3, 0, 0]} rotateZ={angle} />
                <Ring rotation={[-Math.PI / 4, Math.PI / 4, 0]} rotateZ={-angle * 1.2} />
            </group>
        </ThreeCanvas>

        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", pointerEvents: "none" }}>
            <h1 style={{
                fontFamily: "sans-serif",
                fontSize: 100,
                fontWeight: 900,
                color: "#C9A84C",
                textAlign: "center",
                textShadow: `0 0 ${20 * glow}px rgba(201,168,76,0.8)`,
                transform: `scale(${pushIn})`,
                opacity: entrance,
                margin: 0
            }}>
                THE BOARD<br/>FLIPS
            </h1>
        </AbsoluteFill>
    </AbsoluteFill>
  );
};
