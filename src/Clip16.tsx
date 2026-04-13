import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";

export const Clip16 = () => {
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

  const continuousScale = interpolate(frame, [0, 150], [1, 1.08]);
  
  // Particle explosion logic
  const explosionProgress = spring({
    frame,
    fps,
    config: {
      stiffness: 100,
      damping: 10,
    },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Background */}
      <AbsoluteFill 
        style={{ 
          background: 'radial-gradient(circle at center, rgba(30,25,15,1) 0%, rgba(5,5,5,1) 60%, rgba(0,0,0,1) 100%)',
          filter: 'blur(24px)'
        }} 
      />

      {/* 3D Particles */}
      <AbsoluteFill>
        <ThreeCanvas width={width} height={height} alpha={true}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {new Array(50).fill(0).map((_, i) => {
             const angle = (i / 50) * Math.PI * 2;
             const radius = explosionProgress * 10;
             const x = Math.cos(angle) * radius;
             const y = Math.sin(angle) * radius;
             const z = -5 + (i % 10);
             return (
               <mesh key={i} position={[x, y, z]} rotation={[frame * 0.05, frame * 0.03, i]}>
                 <boxGeometry args={[0.2, 0.2, 0.2]} />
                 <meshStandardMaterial color="#C9A84C" />
               </mesh>
             );
          })}
        </ThreeCanvas>
      </AbsoluteFill>

      {/* Typography */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "280px",
            fontWeight: "900",
            color: "white",
            margin: 0,
            WebkitTextStroke: "2px #C9A84C",
            textShadow: "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)",
            transform: `scale(${entrance * continuousScale})`,
          }}
        >
          $400M
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
