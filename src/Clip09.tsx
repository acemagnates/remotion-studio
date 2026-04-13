import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip09 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const translateY = spring({
    frame,
    fps,
    from: 1000,
    to: 0,
    config: {
      stiffness: 200,
      damping: 25,
    },
  });

  const continuousScale = interpolate(frame, [0, 150], [1, 1.03]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Obsidian Vault Background */}
      <AbsoluteFill 
        style={{ 
          background: 'radial-gradient(circle at center, rgba(30,25,15,1) 0%, rgba(5,5,5,1) 60%, rgba(0,0,0,1) 100%)',
          backdropFilter: 'blur(24px)'
        }} 
      />

      {/* Typography */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "180px",
            fontWeight: "900",
            color: "white",
            margin: 0,
            textAlign: "center",
            WebkitTextStroke: "1px #C9A84C",
            textShadow: "0 0 12px rgba(201,168,76,0.6), 0 4px 20px rgba(0,0,0,0.8)",
            transform: `translateY(${translateY}px) scale(${continuousScale})`,
            padding: "0 40px",
          }}
        >
          6 MONTHS
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
