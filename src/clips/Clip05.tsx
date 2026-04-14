import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import * as THREE from "three";

const ParticleSystem = ({ count = 50 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Burst timing: starts at 24 frames (0.8s)
  const burstFrame = 24;
  const burstSpring = spring({
    frame: frame - burstFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize(),
      speed: Math.random() * 5 + 2,
    }));
  }, [count]);

  return (
    <group>
      {particles.map((p, i) => {
        const drift = burstSpring * p.speed;
        const pos = p.position.clone().multiplyScalar(drift);
        return (
          <mesh key={i} position={[pos.x, pos.y, pos.z]}>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshBasicMaterial color="#C9A84C" transparent opacity={interpolate(burstSpring, [0.8, 1], [1, 0])} />
          </mesh>
        );
      })}
    </group>
  );
};

export const Clip05: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: COUNTER ROLL
  const rollDuration = 24; // 0.8s
  const currentNum = Math.floor(
    interpolate(frame, [0, rollDuration], [0, 2019], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    })
  );

  // ACT 2: HOLD + EVOLUTION
  const scale = interpolate(frame, [rollDuration, durationInFrames], [1, 1.08], {
    extrapolateLeft: "clamp",
  });

  // ACT 3: EXIT (Glitch)
  const exitStart = durationInFrames - 15;
  const isExiting = frame > exitStart;
  const glitchIntensity = interpolate(frame, [exitStart, durationInFrames], [0, 1]);
  
  const glitchStyle = isExiting ? {
    transform: `translateX(${(Math.random() - 0.5) * 50 * glitchIntensity}px)`,
    filter: `hue-rotate(${glitchIntensity * 90}deg) brightness(${1 + glitchIntensity})`,
    clipPath: `inset(${Math.random() * 20}% 0 ${Math.random() * 20}% 0)`,
  } : {};

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleSystem />
      </ThreeCanvas>

      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center",
        opacity: interpolate(frame, [exitStart, durationInFrames], [1, 0], { extrapolateLeft: "clamp" }),
        ...glitchStyle
      }}>
        <h1 style={{
          fontFamily: "monospace",
          fontSize: 240,
          color: "#FFFFFF",
          fontWeight: 900,
          margin: 0,
          transform: `scale(${scale})`,
          textShadow: "0 0 20px rgba(201,168,76,0.6)",
        }}>
          {currentNum}
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
