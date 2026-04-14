import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const Clip02MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Scanline overlay
  const scanlines = (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.15) 2px,
          rgba(0, 0, 0, 0.15) 4px
        )`,
      }}
    />
  );

  const line1 = "OUR PRODUCT";
  const line2 = "IS OVERPRICED.";

  // ACT 1: ENTRANCE (0.0 - 0.8s)
  // Line 1 types on: 1 char per 2 frames
  const chars1Visible = Math.floor(frame / 2);
  const text1 = line1.slice(0, chars1Visible);

  // ACT 2: HOLD + EVOLUTION (0.8 - 2.2s)
  // Line 2 starts after a beat (0.3s = 9 frames)
  const line2Start = line1.length * 2 + 9;
  const chars2Visible = Math.floor((frame - line2Start) / 2);
  const text2 = line2.slice(0, Math.max(0, chars2Visible));

  // Cursor blinking
  const cursorVisible = Math.floor(frame / (fps * 0.4)) % 2 === 0;

  // Gold rule draws on
  const ruleStart = line2Start + line2.length * 2;
  const ruleProgress = spring({
    frame: frame - ruleStart,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const ruleWidth = interpolate(ruleProgress, [0, 1], [0, 600]);

  // Scale 100% -> 103%
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.03]);

  // Glow pulse for "OVERPRICED."
  const glowPulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.8, 1]
  );

  // ACT 3: EXIT (2.2 - 2.5s)
  const exit = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      {scanlines}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
        }}
      >
        <div style={{ textAlign: "center", width: "100%" }}>
          {/* Line 1 */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 60,
              fontWeight: "bold",
              color: "#C9A84C",
              marginBottom: 20,
              letterSpacing: "0.1em",
            }}
          >
            {text1}
            {frame < line2Start && cursorVisible && "|"}
          </div>

          {/* Line 2 */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 90,
              fontWeight: 900,
              color: "#FFF",
              textShadow: `0 0 12px rgba(201,168,76,${0.8 * glowPulse})`,
              letterSpacing: "0.05em",
            }}
          >
            {text2}
            {frame >= line2Start && frame < ruleStart && cursorVisible && "|"}
            {frame >= ruleStart && cursorVisible && "|"}
          </div>

          {/* Horizontal Rule */}
          <div
            style={{
              height: 2,
              backgroundColor: "#C9A84C",
              width: ruleWidth,
              margin: "40px auto",
              opacity: 0.8,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
