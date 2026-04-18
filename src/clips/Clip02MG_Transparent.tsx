import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip02MG_Transparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0.5s = 15 frames)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // Counter animation
  const countValue = Math.floor(
    interpolate(frame, [0, 30], [0, 10000], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    })
  );

  // ACT 2: HOLD + EVOLUTION
  // Hit 10,000 at 1.0s (30 frames)
  const scale = interpolate(frame, [30, durationInFrames], [1, 1.08], {
    extrapolateLeft: "clamp",
  });

  // Particles burst at 1.0s
  const burstFrame = 30;
  const particles = new Array(20).fill(0).map((_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const velocity = 5 + (i % 5) * 5;
    const distance = interpolate(frame, [burstFrame, durationInFrames], [0, velocity * 40], {
      extrapolateLeft: "clamp",
    });
    const opacity = interpolate(frame, [burstFrame, burstFrame + 15, durationInFrames], [0, 0.8, 0], {
      extrapolateLeft: "clamp",
    });

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          width: 4,
          height: 4,
          backgroundColor: "#C9A84C",
          borderRadius: "50%",
          opacity,
          transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
          top: "50%",
          left: "50%",
        }}
      />
    );
  });

  // ACT 3: EXIT (0.5s = 15 frames)
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exit, justifyContent: "center", alignItems: "center" }}>
      {/* NO BACKGROUND FOR TRANSPARENT CLIP */}
      {particles}
      <div
        style={{
          transform: `scale(${entrance * scale})`,
          color: "white",
          fontSize: 180,
          fontWeight: 900,
          fontFamily: "Inter, sans-serif",
          textShadow: "0 0 15px rgba(201,168,76,0.8), 0 10px 30px rgba(0,0,0,0.5)",
          textAlign: "center",
          WebkitTextStroke: "2px #C9A84C",
        }}
      >
        ${countValue.toLocaleString()}
      </div>
    </AbsoluteFill>
  );
};
