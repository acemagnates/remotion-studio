import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip07MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Fast roll)
  const rollDuration = 30; // 1s
  const rollSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const value = interpolate(rollSpring, [0, 1], [50000000, 0], {
    extrapolateRight: "clamp",
  });

  const formattedValue = "$" + Math.floor(value).toLocaleString();

  // Vertical blur during roll
  const blur = interpolate(rollSpring, [0, 0.8, 1], [20, 10, 0]);

  // ACT 2: HOLD + EVOLUTION (Scale and Burst)
  const driftScale = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  
  // Gold Sparks burst at 1s (frame 30)
  const burstSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  // ACT 3: EXIT (Collapse inward)
  const exitFrame = durationInFrames - 15;
  const exitSpring = spring({
    frame: frame - exitFrame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const collapseY = interpolate(exitSpring, [0, 1], [1, 0.01]);
  const collapseX = interpolate(exitSpring, [0, 1], [1, 2]);
  const exitOpacity = interpolate(exitSpring, [0, 0.5], [1, 0]);

  const sparks = new Array(15).fill(0).map((_, i) => {
    const angle = (i / 15) * Math.PI * 2;
    const dist = interpolate(burstSpring, [0, 1], [0, 400]);
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 6,
          height: 6,
          backgroundColor: "#C9A84C",
          borderRadius: "50%",
          opacity: interpolate(burstSpring, [0.5, 1], [1, 0]),
          transform: `translate(-50%, -50%) translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
          boxShadow: "0 0 10px #C9A84C",
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exitOpacity }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 140,
          fontWeight: 900,
          color: "#C9A84C",
          filter: `blur(${blur}px)`,
          transform: `scale(${driftScale}) scale(${collapseX}, ${collapseY})`,
          textAlign: "center",
          textShadow: "0 0 30px rgba(201,168,76,0.4)",
        }}>
          {formattedValue}
        </div>
      </AbsoluteFill>
      {sparks}
    </AbsoluteFill>
  );
};
