import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const AddMoreStrike = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [0, 10], [0, 1]);
  
  const strikeProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  const strikeWidth = interpolate(strikeProgress, [0, 1], [0, 900]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative" }}>
        <h1
          style={{
            color: "white",
            fontSize: 160,
            fontWeight: 900,
            opacity: textOpacity,
            fontFamily: "Inter, sans-serif",
            margin: 0,
            textAlign: "center",
          }}
        >
          ADD MORE
        </h1>

        {/* Strike-through line */}
        <div
          style={{
             position: "absolute",
             top: "50%",
             left: "50%",
             width: strikeWidth,
             height: 25,
             backgroundColor: "#C9A84C",
             boxShadow: "0 0 40px #C9A84C",
             transform: "translate(-50%, -50%) skew(-15deg)",
             zIndex: 5,
             opacity: strikeProgress > 0 ? 1 : 0,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
