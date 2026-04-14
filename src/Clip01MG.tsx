import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip01MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const slamScale = interpolate(entrance, [0, 1], [4, 1], {
    extrapolateRight: "clamp",
  });

  // SHATTER BURST
  const burstFrame = 24; // ~0.8s
  const burstSpring = spring({
    frame: frame - burstFrame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // ACT 2: EVOLUTION
  const drift = interpolate(frame, [0, durationInFrames], [0, 40]);
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.05]);

  // ACT 3: EXIT
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );
  const exitScale = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 2],
    { extrapolateLeft: "clamp" }
  );

  // Geometric shards (using paths simplified to divs for performance if possible, but recipe says paths)
  // I will use simple SVG paths for shards
  const shards = new Array(20).fill(0).map((_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const distance = interpolate(burstSpring, [0, 1], [0, 600 + (i % 5) * 100]);
    const rot = interpolate(frame, [burstFrame, durationInFrames], [0, (i % 4) * 90 + drift]);
    
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 40 + (i % 3) * 20,
          height: 40 + (i % 3) * 20,
          backgroundColor: "#C9A84C",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", // Triangle shard
          opacity: burstSpring * exit,
          transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${rot}deg) scale(${exitScale})`,
          boxShadow: "0 0 20px rgba(201,168,76,0.6)",
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 160,
            color: "white",
            fontWeight: 900,
            transform: `scale(${slamScale * scale * (1 - burstSpring * 0.2)})`,
            opacity: interpolate(burstSpring, [0, 0.1], [1, 0.4]),
            textShadow: "0 0 20px rgba(255,255,255,0.3)",
          }}
        >
          REJECTED
        </h1>
      </AbsoluteFill>
      {shards}
    </AbsoluteFill>
  );
};
