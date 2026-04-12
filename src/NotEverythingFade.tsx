import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const NotEverythingFade = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 100, 140], [1, 1, 0], {
     extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      <h1
        style={{
          color: "white",
          fontSize: 120,
          fontWeight: 900,
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          opacity: opacity,
          textShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
          padding: "0 40px",
        }}
      >
        NOT EVERYTHING
      </h1>
    </AbsoluteFill>
  );
};
