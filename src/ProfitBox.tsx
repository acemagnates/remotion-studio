import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";

export const ProfitBox = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 20,
      stiffness: 200,
    },
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          transform: `scale(${scale})`,
          padding: "20px 60px",
          border: "2px solid #C9A84C",
          backgroundColor: "rgba(10, 10, 10, 0.4)",
          boxShadow: "0 0 30px rgba(201, 168, 76, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            fontFamily: "system-ui, sans-serif",
            fontSize: 120,
            fontWeight: 900,
            margin: 0,
            letterSpacing: 8,
          }}
        >
          PROFIT
        </h1>
      </div>
    </AbsoluteFill>
  );
};
