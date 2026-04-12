import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";

export const TacoStandSlam = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
    from: 3,
    to: 1,
  });

  const bloomShadow = `
    0 0 10px rgba(201, 168, 76, 0.8),
    0 0 20px rgba(201, 168, 76, 0.4),
    0 0 30px rgba(201, 168, 76, 0.2)
  `;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill
        style={{
          backdropFilter: "blur(24px) brightness(0.5)",
          backgroundColor: "rgba(10, 10, 10, 0.4)",
        }}
      />
      <h1
        style={{
          color: "white",
          fontSize: 100,
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          textAlign: "center",
          WebkitTextStroke: "1px #C9A84C",
          textShadow: bloomShadow,
          transform: `scale(${scale})`,
          margin: 0,
          padding: "0 40px",
        }}
      >
        10x10 <br /> TACO STAND
      </h1>
    </AbsoluteFill>
  );
};
