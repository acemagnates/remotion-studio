import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";

export const Clip01 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      stiffness: 200,
      damping: 20,
    },
  });

  const continuousScale = interpolate(frame, [0, 150], [1, 1.05]);
  const driftY = interpolate(frame, [0, 150], [0, -40]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Obsidian Vault Background */}
      <AbsoluteFill 
        style={{ 
          background: 'radial-gradient(circle at center, rgba(30,25,15,1) 0%, rgba(5,5,5,1) 60%, rgba(0,0,0,1) 100%)',
          filter: 'blur(24px)'
        }} 
      />

      {/* Depth Layer */}
      <AbsoluteFill>
        <ThreeCanvas width={width} height={height} alpha={true}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {new Array(20).fill(0).map((_, i) => (
            <mesh 
              key={i} 
              position={[Math.sin(i) * 5, Math.cos(i) * 5, -10]}
              rotation={[frame * 0.01, frame * 0.02, 0]}
            >
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="#C9A84C" opacity={0.2} transparent />
            </mesh>
          ))}
        </ThreeCanvas>
      </AbsoluteFill>

      {/* Typography */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "320px",
            fontWeight: "900",
            color: "white",
            margin: 0,
            WebkitTextStroke: "2px #C9A84C",
            textShadow: "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)",
            transform: `scale(${entrance * continuousScale}) translateY(${driftY}px)`,
          }}
        >
          2017
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
