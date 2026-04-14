import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Slam from Z-axis)
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
      mass: 2,
    },
  });

  const scaleEntrance = interpolate(entrance, [0, 1], [3, 1]);

  // ACT 2: HOLD + EVOLUTION
  const slowScale = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  const shadowOpacity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.8, 1.0]
  );

  // ACT 3: EXIT
  const exitStart = durationInFrames - 15;
  const exit = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blurX = interpolate(frame, [exitStart, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ 
      justifyContent: "center", 
      alignItems: "center",
      opacity: exit,
    }}>
      <h1
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 160,
          color: "#FFFFFF",
          fontWeight: 900,
          margin: 0,
          textAlign: "center",
          transform: `scale(${scaleEntrance * slowScale})`,
          textShadow: `
            0 0 12px rgba(201, 168, 76, ${shadowOpacity}),
            0 4px 20px rgba(0, 0, 0, 0.8)
          `,
          filter: `blur(${blurX}px)`,
          WebkitTextStroke: "1px #C9A84C",
        }}
      >
        MILLIONS
      </h1>
    </AbsoluteFill>
  );
};
