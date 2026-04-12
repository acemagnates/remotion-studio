import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const TargetEvidenceCard = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // Slide up from bottom
  const slideUp = spring({
    frame,
    fps,
    config: {
      damping: 20,
    },
  });

  const translateY = interpolate(slideUp, [0, 1], [300, 0]);

  // Subtle continuous float
  const float = Math.sin(frame * 0.1) * 2;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: "10%",
          right: "10%",
          height: 200,
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid #C9A84C",
          boxShadow: "0 0 20px rgba(201, 168, 76, 0.4)",
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${translateY + float}px)`,
        }}
      >
        <h2
          style={{
            color: "white",
            fontFamily: "system-ui, sans-serif",
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: 4,
            margin: 0,
          }}
        >
          THE TARGET
        </h2>
      </div>
    </AbsoluteFill>
  );
};
