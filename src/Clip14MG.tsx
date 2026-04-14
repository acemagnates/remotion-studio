import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip14MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0.0-0.5s)
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1]);

  // Morph Start at 0.5s = 15 frames
  const morphFrame = frame - 15;
  const morphDuration = 18;

  // Word A: THE LADDER
  const wordAOpacity = interpolate(morphFrame, [0, morphDuration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wordAScale = interpolate(morphFrame, [0, morphDuration], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wordABlur = interpolate(morphFrame, [0, morphDuration], [0, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Word B: THE CAGE
  const wordBOpacity = interpolate(morphFrame, [0, morphDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wordBBlur = interpolate(morphFrame, [0, morphDuration], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ACT 2: HOLD + EVOLUTION
  // Underline draws on at 1.5s (frame 45)
  const underlineProgress = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const underlineWidth = interpolate(underlineProgress, [0, 1], [0, 600]);

  // Continuous drift for THE CAGE
  const driftScale = interpolate(frame, [45, durationInFrames], [1, 1.05], {
    extrapolateLeft: "clamp",
  });

  // Glow pulse
  const glowPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1]);

  // ACT 3: EXIT (3.0-3.5s)
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* Word A */}
        {morphFrame < morphDuration && (
          <div
            style={{
              position: "absolute",
              fontSize: 140,
              fontWeight: 900,
              color: "#FFF",
              opacity: wordAOpacity * entranceOpacity,
              transform: `scale(${wordAScale})`,
              filter: `blur(${wordABlur}px)`,
              textAlign: "center",
              width: "100%",
            }}
          >
            THE LADDER
          </div>
        )}

        {/* Word B */}
        {morphFrame >= 0 && (
          <div
            style={{
              position: "absolute",
              fontSize: 140,
              fontWeight: 900,
              color: "#FFF",
              opacity: wordBOpacity,
              transform: `scale(${driftScale})`,
              filter: `blur(${wordBBlur}px)`,
              textAlign: "center",
              width: "100%",
              textShadow: `
                0 0 12px rgba(201,168,76,${0.8 * glowPulse}),
                0 4px 20px rgba(0,0,0,0.8)
              `,
            }}
          >
            THE CAGE
          </div>
        )}

        {/* Underline */}
        <div
          style={{
            position: "absolute",
            top: "58%",
            width: underlineWidth,
            height: 4,
            backgroundColor: "#C9A84C",
            boxShadow: `0 0 10px rgba(201,168,76,0.6)`,
            opacity: underlineProgress,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
