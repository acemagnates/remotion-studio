import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";

export const Clip20 = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const driftOffset = frame * 0.005;

  return (
    <AbsoluteFill>
      <ThreeCanvas width={width} height={height} alpha={true}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#C9A84C" />
        
        {new Array(100).fill(0).map((_, i) => {
          // Slow drifting kintsugi dust
          const x = ((i * 13) % 20) - 10 + driftOffset * (i % 2 === 0 ? 1 : -1);
          const y = ((i * 17) % 20) - 10 + driftOffset * 0.5;
          const z = ((i * 7) % 10) - 5;
          const size = (i % 3 + 1) * 0.02;

          return (
            <mesh 
              key={i} 
              position={[x, y, z]} 
              rotation={[frame * 0.01, frame * 0.02, i]}
            >
              <dodecahedronGeometry args={[size, 0]} />
              <meshStandardMaterial 
                color="#C9A84C" 
                emissive="#C9A84C"
                emissiveIntensity={0.5}
                roughness={0.1}
                metalness={1}
              />
            </mesh>
          );
        })}
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
