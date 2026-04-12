import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const ThatsItRipple = () => {
  const frame = useCurrentFrame();

  const rippleScale = interpolate(frame, [0, 40], [1, 3], {
    extrapolateRight: "clamp",
  });
  
  const rippleOpacity = interpolate(frame, [0, 10, 40], [0, 0.4, 0], {
     extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <h1
        style={{
          color: "white",
          fontSize: 120,
          fontWeight: 900,
          textShadow: "0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)",
          fontFamily: "Inter, sans-serif",
          letterSpacing: 8,
          zIndex: 10,
        }}
      >
        THAT'S IT.
      </h1>

      {/* Ripple Effect */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          border: "4px solid white",
          borderRadius: "50%",
          transform: `scale(${rippleScale})`,
          opacity: rippleOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
