import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const GoldCrosshair = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance: Rotate and scale down
  const snapProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const scale = interpolate(snapProgress, [0, 1], [3, 1]);
  const rotation = interpolate(snapProgress, [0, 1], [-180, 0]);

  // Blur pulse post-snap (starts frame 30)
  const pulseScale = spring({
    frame: frame - 30,
    fps,
    config: { damping: 10 },
  });
  const blur = interpolate(pulseScale, [0, 0.5, 1], [0, 24, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          filter: `blur(${blur}px)`,
        }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="100" fill="none" stroke="#C9A84C" strokeWidth="4" />
          <line x1="200" y1="50" x2="200" y2="150" stroke="#C9A84C" strokeWidth="4" />
          <line x1="200" y1="250" x2="200" y2="350" stroke="#C9A84C" strokeWidth="4" />
          <line x1="50" y1="200" x2="150" y2="200" stroke="#C9A84C" strokeWidth="4" />
          <line x1="250" y1="200" x2="350" y2="200" stroke="#C9A84C" strokeWidth="4" />
          {/* Inner focus dot */}
          <circle cx="200" cy="200" r="10" fill="#C9A84C" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
