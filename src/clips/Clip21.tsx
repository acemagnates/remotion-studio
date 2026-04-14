import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ThreeCanvas } from "@remotion/three";

const OrbitalRing = ({ radius, speed, color, tilt }: { radius: number; speed: number; color: string; tilt: number }) => {
  const frame = useCurrentFrame();
  const angle = (frame * speed) % 360;

  return (
    <group rotation={[tilt, 0, (angle * Math.PI) / 180]}>
      <mesh>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

export const Clip21: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const textOpacity = interpolate(entrance, [0, 1], [0, 1]);
  const ringScale = interpolate(entrance, [0, 1], [0, 1]);

  // ACT 2: EVOLUTION
  const scaleDrift = interpolate(frame, [0, durationInFrames], [1, 1.05]);

  // ACT 3: EXIT
  const exitStart = durationInFrames - 15;
  const exitSpring = spring({ frame: frame - exitStart, fps, config: { damping: 10, stiffness: 200 } });
  const collapse = interpolate(exitSpring, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <ThreeCanvas width={width} height={height} camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <group scale={ringScale * collapse}>
          <OrbitalRing radius={1.5} speed={2} color="#C9A84C" tilt={Math.PI / 3} />
          <OrbitalRing radius={1.8} speed={-1.5} color="#C9A84C" tilt={-Math.PI / 4} />
        </group>
      </ThreeCanvas>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: textOpacity * collapse }}>
        <h1 style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 100,
          color: "#FFFFFF",
          fontWeight: 900,
          textAlign: "center",
          letterSpacing: "0.1em",
          transform: `scale(${scaleDrift})`,
          textShadow: "0 0 20px rgba(255,255,255,0.3)"
        }}>
          HIDDEN<br/>SCOREBOARD
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
