import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const LocationStamp = () => {
  const frame = useCurrentFrame();

  const slideIn = interpolate(frame, [0, 20], [-1000, 60], {
    extrapolateRight: "clamp",
    easing: (t) => t * (2 - t),
  });

  const pulse = Math.sin(frame * 0.1) * 0.1 + 1;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: slideIn,
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(12px)",
          padding: "20px 40px",
          border: "2px solid #C9A84C",
          display: "flex",
          alignItems: "center",
          boxShadow: `0 0 ${20 * pulse}px rgba(201, 168, 76, 0.4)`,
          transformOrigin: "left bottom",
        }}
      >
        <h3
          style={{
            color: "white",
            fontSize: 48,
            fontWeight: 800,
            margin: 0,
            letterSpacing: 4,
            fontFamily: "Inter, sans-serif",
          }}
        >
          MEXICO CITY
        </h3>
      </div>
    </AbsoluteFill>
  );
};
