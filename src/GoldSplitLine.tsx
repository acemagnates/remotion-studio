import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const GoldSplitLine = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // Draw in 0.3s (18 frames at 60fps)
  const drawDuration = 18;
  const progress = interpolate(frame, [0, drawDuration], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Pulse glow
  const pulse = Math.sin(frame * 0.1) * 0.5 + 0.5;
  const glowIntensity = interpolate(pulse, [0, 1], [5, 15]);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: 2,
          height: `${progress * 100}%`,
          backgroundColor: "#C9A84C",
          boxShadow: `0 0 ${glowIntensity}px #C9A84C`,
          transform: "translateX(-50%)",
        }}
      />
    </AbsoluteFill>
  );
};
