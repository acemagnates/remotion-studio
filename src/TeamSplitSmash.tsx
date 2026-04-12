import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const TeamSplitSmash = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Smash animation
  const smashProgress = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  const leftX = interpolate(smashProgress, [0, 1], [-width / 2, 0]);
  const rightX = interpolate(smashProgress, [0, 1], [width / 2, 0]);

  // Checkmark scale
  const checkmarkScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Left Block - Team A */}
      <div
        style={{
          position: "absolute",
          left: leftX,
          width: "50%",
          height: "100%",
          backgroundColor: "#B91C1C", // Crimson Red
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", fontSize: 80, fontWeight: 900 }}>TEAM A</h1>
      </div>

      {/* Right Block - Team B */}
      <div
        style={{
          position: "absolute",
          right: rightX,
          width: "50%",
          height: "100%",
          backgroundColor: "#1E3A8A", // Deep Blue
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", fontSize: 80, fontWeight: 900 }}>TEAM B</h1>
      </div>

      {/* Gold Checkmark */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            transform: `scale(${checkmarkScale})`,
            color: "#C9A84C",
            fontSize: 300,
            textShadow: "0 0 40px rgba(0,0,0,0.5)",
            filter: "drop-shadow(0 0 20px #C9A84C)",
          }}
        >
          ✓
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
