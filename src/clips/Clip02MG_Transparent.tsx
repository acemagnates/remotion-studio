import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";

const GoldParticles = ({ frame }: { frame: number }) => {
  const { durationInFrames } = useVideoConfig();
  const burstFrame = 45; // 1.5s
  
  const count = 30;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const speed = 2 + Math.random() * 5;
        temp.push({ theta, phi, speed });
    }
    return temp;
  }, []);

  if (frame < burstFrame) return null;

  return (
    <group>
      {particles.map((p, i) => {
        const progress = interpolate(frame, [burstFrame, durationInFrames], [0, 5], {
            extrapolateLeft: "clamp",
        });
        const distance = progress * p.speed;
        const opacity = interpolate(frame, [burstFrame, burstFrame + 5, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
        });
        
        const x = distance * Math.sin(p.phi) * Math.cos(p.theta);
        const y = distance * Math.sin(p.phi) * Math.sin(p.theta);
        const z = distance * Math.cos(p.phi);

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.1, 6, 6]} />
            <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={2} transparent opacity={opacity} />
          </mesh>
        );
      })}
    </group>
  );
};

export const Clip02MG_Transparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (0.5s = 15 frames)
  // Digits spring slam from below with heavy vault physics (damping: 15, stiffness: 80, mass: 2)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  });

  const translateY = interpolate(entrance, [0, 1], [1000, 0]);

  // ACT 2: HOLD + EVOLUTION
  // Digits rapidly spin down from 90 to 60 and lock at 1.5s (45 frames)
  const counterValue = Math.floor(
    interpolate(frame, [0, 45], [90, 60], {
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.33, 1, 0.68, 1),
    })
  );

  // Number pulses scale (100%→108%) continuously
  const pulse = interpolate(
    Math.sin((frame / 30) * Math.PI * 2),
    [-1, 1],
    [1, 1.08]
  );

  // ACT 3: EXIT
  // Number and particles scale down to 0 over 0.3s (9 frames)
  const exitScale = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#00FF00', overflow: 'hidden' }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `translateY(${translateY}px) scale(${pulse * exitScale})` }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
             <ThreeCanvas width={width} height={height}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <GoldParticles frame={frame} />
             </ThreeCanvas>
        </div>
        
        <h1 style={{
          fontFamily: "sans-serif",
          fontSize: 400,
          fontWeight: 900,
          color: "white",
          WebkitTextStroke: "8px #C9A84C",
          textShadow: "0 0 20px rgba(201,168,76,0.8), 0 0 40px rgba(201,168,76,0.4), 0 10px 40px rgba(0,0,0,0.8)",
          margin: 0,
          zIndex: 10
        }}>
          {counterValue}
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
