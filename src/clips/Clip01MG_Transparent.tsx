import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo, useRef } from "react";
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
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      ),
      size: Math.random() * 0.05 + 0.02
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
        const d = interpolate(progress, [0, 1], [0, 5]);
        const pos: [number, number, number] = [
          p.position.x * d,
          p.position.y * d,
          p.position.z * d - 2
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

  const translateY = interpolate(roll, [0, 1], [1000, -value * 200]);

  return (
    <div style={{
      height: 200,
      overflow: "hidden",
      fontSize: 200,
      fontWeight: 900,
      fontFamily: "sans-serif",
      color: "#FFF",
      textShadow: "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)",
      WebkitTextStroke: "2px #C9A84C",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ transform: `translateY(${translateY}px)` }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
          <div key={d} style={{ height: 200, textAlign: "center" }}>{d}</div>
        ))}
      </div>
    </div>
  );
};

export const Clip01MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08]);
  const exitScale = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 2.5], { extrapolateLeft: "clamp" });
  const exitOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      <AbsoluteFill style={{ transform: `scale(${scale * exitScale})`, opacity: exitOpacity }}>
        <AbsoluteFill style={{ pointerEvents: "none" }}>
          <ParticleBurst />
        </AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
          <Digit value={2} delay={0} />
          <Digit value={0} delay={5} />
          <Digit value={1} delay={10} />
          <Digit value={2} delay={15} />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
