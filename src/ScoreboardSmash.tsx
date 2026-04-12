import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const ScoreboardSmash = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smash: From darkness/far away
  const smash = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const scale = interpolate(smash, [0, 1], [4, 1]);
  const opacity = interpolate(smash, [0, 0.2], [0, 1]);

  // Inner glow intensifying
  const glowProgress = interpolate(frame, [30, 150], [0, 1]);
  const glowIntensity = interpolate(glowProgress, [0, 1], [5, 40]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Background blurred vault */}
      <AbsoluteFill
        style={{
          backgroundColor: "#0A0A0A",
          filter: "blur(24px)",
          opacity: 0.8,
        }}
      />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            transform: `scale(${scale})`,
            opacity,
            padding: "40px 80px",
            border: "2px solid #C9A84C",
            backgroundColor: "rgba(10, 10, 10, 0.9)",
            boxShadow: `inset 0 0 ${glowIntensity}px rgba(201, 168, 76, 0.8), 0 0 20px rgba(0,0,0,0.5)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontFamily: "system-ui, sans-serif",
              fontSize: 80,
              fontWeight: 900,
              textAlign: "center",
              margin: 0,
              textShadow: `0 0 ${glowIntensity / 2}px white`,
            }}
          >
            DIFFERENT<br />SCOREBOARD
          </h1>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
