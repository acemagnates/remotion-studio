import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const Bar = ({ height, delay, color }: { height: number; delay: number; color: string }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const grow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const microScale = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  const exit = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const sheenPos = (frame * 5) % 1000;

  return (
    <div
      style={{
        width: 150,
        height: height * grow * microScale * exit,
        backgroundColor: color,
        position: "relative",
        borderRadius: "8px 8px 0 0",
        boxShadow: `0 0 30px ${color}44`,
        overflow: "hidden"
      }}
    >
      {/* Sheen Gradient */}
      <div
        style={{
          position: "absolute",
          top: sheenPos - 500,
          left: 0,
          width: "100%",
          height: 200,
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)",
          transform: "skewY(-20deg)"
        }}
      />
    </div>
  );
};

export const Clip06MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const axisDraw = spring({ frame, fps, config: { damping: 20 } });
  
  // Staggered bars
  const bars = [
    { height: 1200, delay: 10, color: "#BF0000" },
    { height: 1400, delay: 15, color: "#BF0000" },
    { height: 1100, delay: 20, color: "#BF0000" },
    { height: 200, delay: 25, color: "#C9A84C" },
  ];

  const textOpacity = interpolate(frame, [40, 50], [0, 1]);
  const textScale = spring({ frame: frame - 40, fps });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "flex-end", alignItems: "center", paddingBottom: 200 }}>
      {/* X-Axis */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: "10%",
          width: interpolate(axisDraw, [0, 1], [0, 80]),
          height: 4,
          backgroundColor: "#C9A84C",
          width: "80%",
          opacity: axisDraw
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-end", gap: 40, zIndex: 2 }}>
        {bars.map((bar, i) => (
          <Bar key={i} {...bar} />
        ))}
      </div>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 300,
          width: "100%",
          textAlign: "center",
          opacity: textOpacity,
          transform: `scale(${textScale})`
        }}
      >
        <h1 style={{ fontFamily: "Impact, sans-serif", fontSize: 120, color: "#FFF", margin: 0, textShadow: "0 0 20px rgba(255,255,255,0.5)" }}>
          50 HRS
        </h1>
        <p style={{ fontFamily: "Arial", fontSize: 40, color: "#C9A84C", marginTop: 10 }}>HOURS WORKED</p>
      </div>
    </AbsoluteFill>
  );
};
