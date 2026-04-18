import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import * as THREE from "three";

const ParticleBurst = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const particles = useMemo(() => {
    return new Array(40).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ),
      size: Math.random() * 0.05 + 0.02,
      speed: Math.random() * 0.5 + 0.5
    }));
  }, []);

  const progress = spring({
    frame: frame - 15,
    fps: 30,
    config: { damping: 20, stiffness: 100 }
  });

  return (
    <ThreeCanvas width={width} height={height}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {particles.map((p, i) => {
        const d = interpolate(progress, [0, 1], [0, 8 * p.speed]);
        const pos: [number, number, number] = [
          p.position.x * d,
          p.position.y * d,
          p.position.z * d - 3 + (frame * 0.01)
        ];
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={2} />
          </mesh>
        );
      })}
    </ThreeCanvas>
  );
};

const Digit = ({ value, delay }: { value: number; delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const roll = spring({
    frame,
    fps,
    delay,
    config: { damping: 15, stiffness: 80, mass: 2 }
  });

  const translateY = interpolate(roll, [0, 1], [-12000, -(5 * 2400 + value * 240)]);

  return (
    <div style={{
      height: 240,
      overflow: "hidden",
      fontSize: 240,
      fontWeight: 900,
      fontFamily: "Inter, sans-serif",
      color: "#FFF",
      textShadow: "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)",
      WebkitTextStroke: "4px #C9A84C",
      display: "flex",
      flexDirection: "column",
      margin: "0 5px"
    }}>
      <div style={{ transform: `translateY(${translateY}px)` }}>
        {[...Array(10)].map((_, i) => (
            <div key={i}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
                <div key={d} style={{ height: 240, textAlign: "center" }}>{d}</div>
                ))}
            </div>
        ))}
      </div>
    </div>
  );
};

export const Clip01MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08]);
  const exitProgress = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1], { extrapolateLeft: "clamp" });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 4]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      <AbsoluteFill style={{ transform: `scale(${scale * exitScale})`, opacity: exitOpacity }}>
        <AbsoluteFill style={{ pointerEvents: "none" }}>
          <ParticleBurst />
        </AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
          <Digit value={2} delay={0} />
          <Digit value={0} delay={4} />
          <Digit value={1} delay={8} />
          <Digit value={2} delay={12} />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
