import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Clip19: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const morphPoint = durationInFrames * 0.4;
  
  // Transition properties
  const blur = interpolate(frame, [morphPoint - 10, morphPoint, morphPoint + 10], [0, 60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  
  const scale = interpolate(frame, [morphPoint - 10, morphPoint, morphPoint + 10], [1, 1.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacityA = interpolate(frame, [morphPoint - 5, morphPoint + 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacityB = interpolate(frame, [morphPoint - 5, morphPoint + 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.6, 1.0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        filter: `blur(${blur}px)`,
        transform: `scale(${scale})`,
        textAlign: "center",
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {/* Word A */}
        <h1 style={{
          fontFamily: "Arial Black, sans-serif",
          fontSize: 160,
          color: "#FFFFFF",
          fontWeight: 900,
          margin: 0,
          opacity: opacityA,
          position: "absolute",
        }}>
          UNLOVABLE
        </h1>

        {/* Word B */}
        <h1 style={{
          fontFamily: "Arial Black, sans-serif",
          fontSize: 180,
          color: "#C9A84C",
          fontWeight: 900,
          margin: 0,
          opacity: opacityB,
          textShadow: `0 0 ${glowPulse * 40}px rgba(201, 168, 76, 0.8)`,
          position: "absolute",
        }}>
          RIGGED
        </h1>
      </div>

      <AbsoluteFill style={{ 
        backgroundColor: "#000", 
        opacity: interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1]) 
      }} />
    </AbsoluteFill>
  );
};
