import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip04MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0 - 1s)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  const scaleZ = interpolate(entrance, [0, 1], [0, 1]);
  const rotateX = interpolate(entrance, [0, 1], [45, 15]);
  const rotateY = interpolate(entrance, [0, 1], [-45, -10]);

  // ACT 2: HOLD + EVOLUTION
  const driftScale = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  const driftX = Math.sin(frame / 30) * 5;
  const driftY = Math.cos(frame / 20) * 5;
  const bloomPulse = interpolate(
    Math.sin(frame * 0.2),
    [-1, 1],
    [30, 60]
  );

  // ACT 3: EXIT (0.3 - 0.5s)
  const exitFrame = durationInFrames - 12;
  const isExiting = frame >= exitFrame;
  const exitProgress = interpolate(frame, [exitFrame, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
  });

  // Glitch Effect
  const glitchX = isExiting ? (Math.random() - 0.5) * 50 * exitProgress : 0;
  const glitchOpacity = isExiting ? (Math.random() > 0.5 ? 1 : 0) * (1 - exitProgress) : 1;

  return (
    <AbsoluteFill style={{ perspective: 1200, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          transform: `
            scale(${scaleZ * driftScale}) 
            rotateX(${rotateX + driftX}deg) 
            rotateY(${rotateY + driftY}deg)
            translateX(${glitchX}px)
          `,
          opacity: glitchOpacity,
        }}
      >
        <h1
          style={{
            fontFamily: "Impact, sans-serif",
            fontSize: 500,
            color: "#FFFFFF",
            margin: 0,
            textAlign: "center",
            textShadow: `
              0 0 ${bloomPulse}px rgba(201, 168, 76, 0.9),
              0 0 ${bloomPulse / 2}px rgba(201, 168, 76, 0.5),
              0 10px 40px rgba(0, 0, 0, 0.6)
            `,
          }}
        >
          2X
        </h1>
      </div>
    </AbsoluteFill>
  );
};
