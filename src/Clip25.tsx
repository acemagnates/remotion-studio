import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip25 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      stiffness: 250,
      damping: 20,
    },
  });

  const continuousScale = interpolate(frame, [0, 150], [1, 0.96]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Obsidian Vault Background */}
      <AbsoluteFill 
        style={{ 
          background: 'radial-gradient(circle at center, rgba(30,25,15,1) 0%, rgba(5,5,5,1) 60%, rgba(0,0,0,1) 100%)',
          filter: 'blur(24px)'
        }} 
      />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", transform: `scale(${entrance * continuousScale})` }}>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "140px",
              fontWeight: "900",
              color: "white",
              margin: 0,
              textShadow: "0 0 10px rgba(255,255,255,0.4)",
            }}
          >
            STOP HIDING.
          </h2>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "100px",
              fontWeight: "900",
              color: "#C9A84C",
              margin: 0,
              textShadow: "0 0 15px rgba(201,168,76,0.6)",
              marginTop: "20px",
            }}
          >
            FROM THE TYRANT.
          </h2>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
