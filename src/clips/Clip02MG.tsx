import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip02MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE - Slam from Z-axis
  const entrance = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 120, mass: 1.5 }
  });
  const z = interpolate(entrance, [0, 1], [2000, 0]);
  const bounceScale = interpolate(entrance, [0, 0.8, 1], [0.1, 1.2, 1]);

  // ACT 2: HOLD + EVOLUTION
  const rotationX = interpolate(frame, [0, durationInFrames], [20, -20]);
  const rotationY = interpolate(frame, [0, durationInFrames], [-25, 25]);
  const driftY = interpolate(frame, [0, durationInFrames], [0, -60]);
  const glowPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [15, 35]);

  // ACT 3: EXIT - X-axis shift
  const exitProgress = interpolate(frame, [durationInFrames - 12, durationInFrames], [0, 1], { extrapolateLeft: "clamp" });
  const exitX = interpolate(exitProgress, [0, 1], [0, 2000]);
  const exitOpacity = interpolate(exitProgress, [0, 0.3], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center",
        perspective: 1500
      }}>
        <div style={{
          transform: `translateY(${driftY}px) translateX(${exitX}px) translateZ(${z}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${bounceScale})`,
          opacity: exitOpacity,
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: 180,
            fontWeight: 900,
            color: "#FFF",
            fontFamily: "Inter, sans-serif",
            margin: 0,
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            textShadow: `0 0 ${glowPulse}px rgba(201,168,76,0.9), 0 0 ${glowPulse * 1.5}px rgba(201,168,76,0.6)`,
          }}>
            PLANTING<br/>WEEDS
          </h1>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
