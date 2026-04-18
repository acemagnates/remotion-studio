import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip03MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (1.0s = 30 frames)
  const drawProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const splitSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // ACT 2: HOLD + EVOLUTION
  const drift = interpolate(frame, [30, durationInFrames], [0, 50]);
  const textScale = interpolate(frame, [30, durationInFrames], [1, 1.1]);
  const glowPulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.6, 1]
  );

  // ACT 3: EXIT (0.5s = 15 frames)
  const exitScale = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 5],
    { extrapolateLeft: "clamp" }
  );
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const splitWidth = splitSpring * (150 + drift);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", transform: `scale(${exitScale})`, opacity: exitOpacity }}>
      {/* Background - reveal text */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            color: "#C9A84C",
            fontSize: 120,
            fontWeight: 900,
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
            textShadow: `0 0 ${20 * glowPulse}px rgba(201,168,76,0.8)`,
            transform: `scale(${textScale})`,
          }}
        >
          PASSIVE<br />INCOME
        </h1>
      </AbsoluteFill>

      {/* Obsidian Panels */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: `calc(50% + ${splitWidth / 2}px)`,
          backgroundColor: "#0A0A0A",
          boxShadow: "10px 0 30px rgba(0,0,0,0.8)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          left: `calc(50% + ${splitWidth / 2}px)`,
          backgroundColor: "#0A0A0A",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.8)",
          zIndex: 2,
        }}
      />

      {/* Gold Fracture Line */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          overflow: "visible",
        }}
      >
        <path
          d="M 540 0 L 520 200 L 560 400 L 510 600 L 550 800 L 530 1000 L 570 1200 L 520 1400 L 550 1600 L 530 1920"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="6"
          strokeDasharray="2000"
          strokeDashoffset={2000 * (1 - drawProgress)}
          style={{
            filter: "drop-shadow(0 0 10px rgba(201,168,76,0.8))",
          }}
        />
      </svg>
    </AbsoluteFill>
  );
};
