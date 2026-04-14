import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const Clip11: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1 & 2: TRACKING EVOLUTION
  const tracking = interpolate(frame, [0, durationInFrames], [0, 50], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 15, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

  // Brackets pulsing
  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1.2]);

  // ACT 3: EXIT
  const exitStart = durationInFrames - 15;
  const scatter = interpolate(frame, [exitStart, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ 
      justifyContent: "center", 
      alignItems: "center",
      opacity,
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 40,
        transform: `translateY(${scatter}px)`,
      }}>
        <span style={{ color: "#C9A84C", fontSize: 120, fontWeight: 300, transform: `scale(${pulse})` }}>[</span>
        <h1 style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 100,
          color: "#FFFFFF",
          fontWeight: 900,
          letterSpacing: `${tracking}px`,
          margin: 0,
          textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 0 15px rgba(255,255,255,0.3)",
        }}>
          INVISIBLE WAR
        </h1>
        <span style={{ color: "#C9A84C", fontSize: 120, fontWeight: 300, transform: `scale(${pulse})` }}>]</span>
      </div>
    </AbsoluteFill>
  );
};
