import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip02MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE - Slam from Z-axis
  const entrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 }
  });
  const z = interpolate(entrance, [0, 1], [1000, 0]);
  const bounceScale = interpolate(entrance, [0, 0.8, 1], [0.5, 1.1, 1]);

  // ACT 2: HOLD + EVOLUTION
  const rotationX = interpolate(frame, [0, durationInFrames], [15, -15]);
  const rotationY = interpolate(frame, [0, durationInFrames], [-20, 20]);
  const driftY = interpolate(frame, [0, durationInFrames], [0, -40]);
  const glowPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [10, 30]);

  // ACT 3: EXIT - X-axis shift + blur
  const exitProgress = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1], { extrapolateLeft: "clamp" });
  const exitX = interpolate(exitProgress, [0, 1], [0, 1500]);
  const exitOpacity = interpolate(exitProgress, [0, 0.5], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center",
        perspective: 1200
      }}>
        <div style={{
          transform: `translateY(${driftY}px) translateX(${exitX}px) translateZ(${z}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${bounceScale})`,
          opacity: exitOpacity,
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: 160,
            fontWeight: 900,
            color: "#FFF",
            fontFamily: "sans-serif",
            margin: 0,
            lineHeight: 0.9,
            textShadow: `0 0 ${glowPulse}px rgba(201,168,76,0.9), 0 0 ${glowPulse * 2}px rgba(201,168,76,0.5)`,
            filter: exitProgress > 0 ? `blur(${exitProgress * 50}px)` : "none"
          }}>
            PLANTING<br/>WEEDS
          </h1>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
