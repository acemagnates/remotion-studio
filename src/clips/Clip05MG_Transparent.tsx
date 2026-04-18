import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip05MG_Transparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0.5s = 15 frames)
  const lineEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  const textSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // ACT 2: HOLD + EVOLUTION (2.0s = 60 frames)
  const drift = interpolate(frame, [0, durationInFrames], [0, 5]);
  const glowPulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.7, 1]
  );

  // ACT 3: EXIT (0.5s = 15 frames)
  const exitProgress = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp" }
  );

  const containerX = 150 + drift;
  const containerY = 1600;

  return (
    <AbsoluteFill>
      {/* NO BACKGROUND FOR TRANSPARENT CLIP */}
      <div
        style={{
          position: "absolute",
          left: containerX,
          top: containerY,
          opacity: 1 - exitProgress,
        }}
      >
        {/* Glass Plate */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 600,
            height: 100,
            backgroundColor: "rgba(10,10,10,0.4)",
            // backdropFilter: 'blur(12px)', // BANNED
            borderRadius: "4px",
            zIndex: -1,
            transform: `scaleX(${lineEntrance})`,
            transformOrigin: "left",
          }}
        />

        {/* Text with Masking */}
        <div
          style={{
            overflow: "hidden",
            height: 80,
            display: "flex",
            alignItems: "flex-end",
            paddingBottom: 10,
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: 48,
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              margin: 0,
              transform: `translateY(${(1 - textSpring + exitProgress) * 100}px)`,
              letterSpacing: "0.1em",
              textShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            14 MONTHS EARLIER
          </h2>
        </div>

        {/* Gold Line */}
        <div
          style={{
            width: lineEntrance * 600 * (1 - exitProgress),
            height: 2,
            backgroundColor: "#C9A84C",
            boxShadow: `0 0 ${10 * glowPulse}px #C9A84C`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
