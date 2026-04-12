import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const MarketingSlam = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slam: 300% to 100%
  const slam = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const scale = interpolate(slam, [0, 1], [3, 1]);

  // Micro-shake on impact (starts frame 15)
  const shakeFrame = 15;
  const shake = frame > shakeFrame && frame < shakeFrame + 6
    ? (Math.random() - 0.5) * 20
    : 0;

  // Kintsugi fracture
  const fractureProgress = spring({
    frame: frame - shakeFrame,
    fps,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale}) translate(${shake}px, ${shake}px)`,
        }}
      >
        <div style={{ position: "relative" }}>
          <h1
            style={{
              color: "white",
              fontFamily: "system-ui, sans-serif",
              fontSize: 100,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            MARKETING<br />DEPARTMENT
          </h1>

          {/* Kintsugi Fracture */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "-10%",
              width: `${fractureProgress * 120}%`,
              height: "6px",
              background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
              boxShadow: "0 0 20px #C9A84C",
              transform: "translateY(-50%) rotate(-5deg)",
              opacity: fractureProgress,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
