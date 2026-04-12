import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const DataSplitFracture = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const shatterProgress = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const riseProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 20 },
  });

  const leftY = interpolate(shatterProgress, [0, 1], [0, height]);
  const leftRotation = interpolate(shatterProgress, [0, 1], [0, 15]);
  const rightY = interpolate(riseProgress, [0, 1], [height / 2, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Left side: $10M shattering */}
      <AbsoluteFill
        style={{
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${leftY}px) rotate(${leftRotation}deg)`,
          opacity: interpolate(shatterProgress, [0, 0.8], [1, 0]),
        }}
      >
        <h2 style={{ color: "white", fontSize: 160, fontWeight: 900 }}>$10M</h2>
        {/* Fracturing lines could be added here using @remotion/paths if needed specifically */}
      </AbsoluteFill>

      {/* Right side: 10x10 rising */}
      <AbsoluteFill
        style={{
          left: "50%",
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#C9A84C",
            fontSize: 160,
            fontWeight: 900,
            transform: `translateY(${rightY}px)`,
            textShadow: "0 0 20px rgba(201, 168, 76, 0.6)",
          }}
        >
          10x10
        </h2>
      </AbsoluteFill>
      
      {/* Split separator line */}
      <div 
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(to bottom, transparent, #C9A84C, transparent)",
          opacity: interpolate(frame, [0, 10], [0, 1]),
        }}
      />
    </AbsoluteFill>
  );
};
