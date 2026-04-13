import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import * as THREE from "three";

const OrbitalRings = ({ tilt }: { tilt: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const primaryAngle = (frame / (4 * fps)) * Math.PI * 2;
  const secondaryAngle = -(frame / (6 * fps)) * Math.PI * 2;

  const ring1Opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const ring2Opacity = interpolate(frame, [0, 45], [0, 0.5], { extrapolateRight: "clamp" });

  const pulse = interpolate(
    Math.sin((frame / fps) * Math.PI),
    [-1, 1],
    [0.7, 1]
  );

  return (
    <group rotation={[tilt, 0, 0]}>
      {/* Primary Ring */}
      <mesh rotation={[0, 0, primaryAngle]}>
        <ringGeometry args={[119, 120.5, 64]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={ring1Opacity * pulse} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Secondary Ring */}
      <mesh rotation={[0, 0, secondaryAngle]}>
        <ringGeometry args={[129, 130, 64]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={ring2Opacity} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const Clip12 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0-0.6s)
  const textSpring = spring({
    frame,
    fps,
    config: { damping: 200 }
  });
  const textScale = interpolate(textSpring, [0, 1], [0.9, 1]);

  // ACT 2: HOLD + EVOLUTION (0.6-3.0s)
  const pulseScale = interpolate(
    Math.sin((frame / fps) * (Math.PI / 0.75)), // 1.5s cycle
    [-1, 1],
    [1, 1.06]
  );

  const exitOpacity = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp"
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, fontFamily: "sans-serif" }}>
      <ThreeCanvas width={width} height={height} style={{ pointerEvents: "none" }} orthographic camera={{ zoom: 1 }}>
        <OrbitalRings tilt={Math.PI / 6} /> {/* 30 degrees tilt */}
      </ThreeCanvas>

      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center", 
        textAlign: "center",
        pointerEvents: "none"
      }}>
        <div style={{
          position: "absolute",
          top: "40%",
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          transform: `scale(${textScale * pulseScale})`,
          textShadow: "0 0 12px rgba(201,168,76,0.5), 0 4px 10px rgba(0,0,0,0.8)"
        }}>
          THE OBSTACLE IS THE WAY
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
