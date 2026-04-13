import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";

const Ring = ({ frame, scale }: { frame: number, scale: number }) => {
  const rotation = (frame / 90) * Math.PI * 2; // one revolution every 3s

  return (
    <group rotation={[0.3, rotation, 0]} scale={[scale, scale, scale]}>
      <mesh>
        <torusGeometry args={[3, 0.08, 16, 100]} />
        <meshBasicMaterial color="#C9A84C" />
      </mesh>
    </group>
  );
};

export const Clip17 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const ringScale = spring({ frame, fps, config: { damping: 200 } });
  const textSpring = spring({ frame, fps, config: { damping: 200 } });
  const subtextFade = interpolate(frame, [9, 18], [0, 1], { extrapolateRight: "clamp" });

  const textScale = interpolate(frame, [0, durationInFrames], [1, 1.07]);
  const glowPulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.8, 1]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      {/* Background Glow */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 50% 50%, rgba(201,168,76,${0.08 * glowPulse}) 0%, transparent 60%)`
      }} />

      {/* Three.js Ring */}
      <ThreeCanvas width={width} height={height}>
          <Ring frame={frame} scale={ringScale} />
      </ThreeCanvas>

      {/* Text */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${textScale})`, pointerEvents: "none" }}>
        <div style={{
            color: "#FFF",
            fontFamily: "sans-serif",
            fontSize: 180,
            fontWeight: 900,
            textShadow: "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)",
            opacity: textSpring
        }}>
            YOU
        </div>
      </AbsoluteFill>

      {/* Subtext */}
      <div style={{
        position: "absolute",
        top: "60%",
        width: "100%",
        textAlign: "center",
        color: "#C9A84C",
        fontFamily: "sans-serif",
        fontSize: 42,
        fontWeight: 400,
        letterSpacing: "0.4em",
        opacity: subtextFade
      }}>
        HAVE THE AUTHORITY.
      </div>
    </AbsoluteFill>
  );
};
