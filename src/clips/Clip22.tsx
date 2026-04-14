import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip22: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const lineStrike = interpolate(frame, [0, 15], [0, 800], { extrapolateRight: "clamp" });
  
  const textRise = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const translateY = interpolate(textRise, [0, 1], [150, 0]);

  // ACT 2: EVOLUTION
  const shimmer = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.5, 1]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center", opacity: exit }}>
      <div style={{ position: "relative" }}>
        {/* Gold Kintsugi Line */}
        <div style={{
          width: lineStrike,
          height: 3,
          backgroundColor: "#C9A84C",
          boxShadow: `0 0 ${shimmer * 15}px #C9A84C`,
          marginBottom: 20
        }} />

        {/* Masked Text Container */}
        <div style={{ overflow: "hidden", position: "relative", height: 160 }}>
          <h1 style={{
            fontFamily: "Arial Black, sans-serif",
            fontSize: 100,
            color: "#FFFFFF",
            fontWeight: 900,
            margin: 0,
            transform: `translateY(${translateY}px)`,
            letterSpacing: "0.2em",
            textAlign: "center",
            width: 800
          }}>
            ACE MAGNATES
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};
