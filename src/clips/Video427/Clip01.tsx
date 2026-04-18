import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip01 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // ACT 2: HOLD + EVOLUTION
  // Counter Roll Logic
  const countProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const currentNumber = Math.floor(interpolate(countProgress, [0, 1], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  const driftY = interpolate(entrance, [0, 1], [200, 0]);

  // Gold particles eruption (starts when numbers hit ~40)
  const particleProgress = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particles = new Array(15).fill(0).map((_, i) => {
    const angle = (i / 15) * Math.PI * 2;
    const dist = particleProgress * 400;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    const pOpacity = interpolate(particleProgress, [0, 0.2, 1], [0, 1, 0]);

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          width: 8,
          height: 8,
          backgroundColor: "#C9A84C",
          borderRadius: "50%",
          opacity: pOpacity,
          transform: `translate(${width/2 + x}px, ${height/2 + y}px)`,
          boxShadow: "0 0 10px #C9A84C",
        }}
      />
    );
  });

  // ACT 3: EXIT
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [0, -100],
    { extrapolateLeft: "clamp" }
  );
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const yearsOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: exitOpacity,
          transform: `translateY(${exit}px) scale(${scale})`,
        }}
      >
        <div style={{ position: "relative", textAlign: "center" }}>
          {particles}
          <h1
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 280,
              fontWeight: 900,
              color: "#FFF",
              margin: 0,
              padding: 0,
              lineHeight: 1,
              transform: `translateY(${driftY}px)`,
              WebkitTextStroke: "4px #C9A84C",
              textShadow: "0 0 20px rgba(201,168,76,0.8), 0 0 40px rgba(201,168,76,0.4)",
            }}
          >
            {currentNumber}
          </h1>
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "#FFF",
              marginTop: -20,
              opacity: yearsOpacity,
              WebkitTextStroke: "2px #C9A84C",
              textShadow: "0 0 15px rgba(201,168,76,0.8)",
              transform: `scale(${interpolate(yearsOpacity, [0, 1], [0.5, 1])})`,
            }}
          >
            YEARS
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
