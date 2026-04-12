import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const StandInLineDrop = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const drop = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  const translateY = interpolate(drop, [0, 1], [-900, 0]);
  
  // Cut to black after 2 seconds (120 frames at 60fps)
  const isVisible = frame < 120;

  const bloomShadow = `
    0 0 10px rgba(201, 168, 76, 0.8),
    0 0 20px rgba(201, 168, 76, 0.4),
    0 0 30px rgba(201, 168, 76, 0.2)
  `;

  if (!isVisible) {
    return <AbsoluteFill style={{ backgroundColor: "black" }} />;
  }

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <h1
        style={{
          color: "#C9A84C",
          fontSize: 120,
          fontWeight: 900,
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          textShadow: bloomShadow,
          transform: `translateY(${translateY}px)`,
          margin: 0,
          padding: "0 40px",
        }}
      >
        STAND IN LINE
      </h1>
    </AbsoluteFill>
  );
};
