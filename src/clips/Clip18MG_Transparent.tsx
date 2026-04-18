import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";

const OrbitalRings = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const angle = (frame * 0.04);

  return (
    <ThreeCanvas width={width} height={height}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      {/* Ring 1 */}
      <mesh rotation={[angle, angle * 0.4, 0]}>
        <torusGeometry args={[2.4, 0.015, 16, 100]} />
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={3} />
      </mesh>
      {/* Ring 2 */}
      <mesh rotation={[angle * -0.6, 0.5, angle * 1.1]}>
        <torusGeometry args={[2.7, 0.015, 16, 100]} />
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={3} />
      </mesh>
    </ThreeCanvas>
  );
};

export const Clip18MG_Transparent = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const entrance = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
    const exitScale = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 5], { extrapolateLeft: "clamp" });
    const opacity = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
            <AbsoluteFill style={{ opacity: entrance * opacity, transform: `scale(${exitScale})` }}>
                <OrbitalRings />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
