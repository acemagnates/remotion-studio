import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip18 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    from: 3,
    to: 1,
    config: {
      stiffness: 150,
      damping: 15,
    },
  });

  const continuousScale = interpolate(frame, [0, 150], [1, 1.02]);
  const driftX = interpolate(frame, [0, 150], [0, 30]);

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: "300px" }}>
        <div
          style={{
            border: "6px solid #C9A84C",
            padding: "20px 60px",
            transform: `scale(${entrance * continuousScale}) translateX(${driftX}px)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: "4px",
          }}
        >
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "120px",
              fontWeight: "900",
              color: "#C9A84C",
              margin: 0,
              letterSpacing: "8px",
              textShadow: "0 0 15px rgba(201,168,76,0.6)",
            }}
          >
            0 DEFECTS
          </h2>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
