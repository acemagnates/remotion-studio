import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence, random } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import React, { useMemo } from "react";

const GoldFragment = ({ delay, angle, distance, seed }: { delay: number; angle: number; distance: number; seed: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const impactFrame = 45; // 0.75s
  const fragmentFrame = frame - impactFrame - delay;
  if (fragmentFrame < 0) return null;

  const progress = spring({
    frame: fragmentFrame,
    fps,
    config: { damping: 40, stiffness: 200 },
  });

  const x = Math.cos(angle) * progress * distance;
  const y = Math.sin(angle) * progress * distance;
  const opacity = interpolate(progress, [0.7, 1], [1, 0]);
  const rotation = progress * 10;

  const w = interpolate(random(seed + "w"), [0, 1], [4, 12]);
  const h = interpolate(random(seed + "h"), [0, 1], [4, 8]);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: w,
        height: h,
        backgroundColor: "#C9A84C",
        opacity,
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}rad)`,
        boxShadow: "0 0 10px #C9A84C",
      }}
    />
  );
};

const Smartphone3D = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fallProgress = spring({
    frame,
    fps,
    config: { damping: 30, stiffness: 100 },
  });

  const yPos = interpolate(fallProgress, [0, 1], [0, -15]); // Plummets downward
  const rotation = frame * 0.05;

  return (
    <group position={[0, yPos, 0]} rotation={[0, rotation, 0]}>
      {/* Phone Body */}
      <mesh>
        <boxGeometry args={[3, 6, 0.4]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* "Flame" Glow - Abstract representation of bright white-gold flames */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0, 0]} scale={[1.2 + i * 0.1, 1.2 + i * 0.1, 1.2]}>
          <boxGeometry args={[3.2, 6.2, 0.5]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#FFFFFF" : "#C9A84C"} 
            transparent 
            opacity={0.1 - (i * 0.02)} 
          />
        </mesh>
      ))}
    </group>
  );
};

export const BurningPhone = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const impactFrame = 45;

  const textSlam = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const textScale = interpolate(textSlam, [0, 1], [4, 1], {
    extrapolateRight: "clamp",
  });

  const showShatter = frame >= impactFrame;

  const fragments = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      angle: random(`angle-${i}`) * Math.PI * 2,
      distance: 300 + random(`dist-${i}`) * 800,
      delay: random(`delay-${i}`) * 10,
    }));
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* 3D Scene */}
      <ThreeCanvas width={width} height={height} camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#C9A84C" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#FFFFFF" />
        <Smartphone3D />
      </ThreeCanvas>

      {/* Slamming Text */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {!showShatter ? (
          <h1
            style={{
              color: "white",
              fontSize: 180,
              fontWeight: "900",
              fontFamily: "Inter, sans-serif",
              transform: `scale(${textScale})`,
              margin: 0,
              textShadow: "0 0 30px rgba(255,255,255,0.5)",
            }}
          >
            2,000,000
          </h1>
        ) : (
          <div style={{ position: "absolute", width: "100%", height: "100%" }}>
             {fragments.map((f, i) => (
               <GoldFragment key={i} {...f} seed={`frag-${i}`} />
             ))}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
