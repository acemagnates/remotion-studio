import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const MillionsSlam = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slam animation: 200% down to 100%
  const slam = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
    },
  });

  const scale = interpolate(slam, [0, 1], [2, 1]);
  const opacity = interpolate(slam, [0, 0.2], [0, 1]);

  // Kintsugi fracture split
  // Appears at impact (let's say frame 15-20 depending on spring)
  const impactProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // Micro-drift backward
  const drift = interpolate(frame, [0, 150], [0, -20]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Smoked Obsidian Vault Background with Heavy Blur */}
      <AbsoluteFill
        style={{
          backgroundColor: "#0A0A0A",
          filter: "blur(24px)",
          opacity: 0.8,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale}) translateY(${drift}px)`,
          opacity,
        }}
      >
        <div style={{ position: "relative" }}>
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 180,
              color: "#FFFFFF",
              fontWeight: 900,
              textAlign: "center",
              WebkitTextStroke: "1px #C9A84C",
              textShadow: "0 0 15px rgba(201, 168, 76, 0.3)",
              margin: 0,
            }}
          >
            MILLIONS
          </h1>

          {/* Kintsugi Fracture */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-10%",
              width: `${impactProgress * 120}%`,
              height: "4px",
              background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
              boxShadow: "0 0 10px #C9A84C",
              transform: "translateY(-50%) skewX(-20deg)",
              opacity: impactProgress,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
