import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const GoldLightLeaks = () => {
  const frame = useCurrentFrame();
  
  // Sweep across the lens
  const sweep = interpolate(frame, [0, 180], [-30, 130]); // 3s @ 60fps = 180 frames
  const opacity = interpolate(frame, [0, 60, 120, 180], [0, 0.7, 0.7, 0]);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: `${sweep}%`,
          width: "100%",
          height: "200%",
          background: "radial-gradient(circle, rgba(201, 168, 76, 0.5) 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: opacity,
          transform: "rotate(20deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50%",
          right: `${sweep - 50}%`,
          width: "120%",
          height: "200%",
          background: "radial-gradient(circle, rgba(201, 168, 76, 0.4) 0%, transparent 80%)",
          filter: "blur(140px)",
          opacity: opacity * 0.9,
          transform: "rotate(-15deg)",
        }}
      />
    </AbsoluteFill>
  );
};
