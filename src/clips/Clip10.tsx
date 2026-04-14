import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Explode + Settle)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const scaleEntrance = interpolate(entrance, [0, 1], [0, 1.2]);
  const settleScale = interpolate(entrance, [0.8, 1], [1, 0.833]); // 1.2 * 0.833 = 1.0 approx

  // ACT 2: HOLD + EVOLUTION (Vibrate + Scale)
  const vibrateX = (Math.random() - 0.5) * 4;
  const vibrateY = (Math.random() - 0.5) * 4;
  const slowScale = interpolate(frame, [0, durationInFrames], [1, 1.1]);

  // ACT 3: EXIT (Drop)
  const exitStart = durationInFrames - 15;
  const exitSpring = spring({
    frame: frame - exitStart,
    fps,
  });
  const dropY = interpolate(exitSpring, [0, 1], [0, 1500]);

  return (
    <AbsoluteFill style={{ 
      justifyContent: "center", 
      alignItems: "center",
      opacity: interpolate(frame, [exitStart, durationInFrames], [1, 0], { extrapolateLeft: "clamp" }),
    }}>
      <h1 style={{
        fontFamily: "Arial Black, sans-serif",
        fontSize: 220,
        color: "#FFFFFF",
        fontWeight: 900,
        margin: 0,
        transform: `scale(${scaleEntrance * settleScale * slowScale}) translate(${vibrateX}px, ${vibrateY + dropY}px)`,
        textShadow: `
          0 0 20px rgba(0,0,0,0.8),
          0 0 10px rgba(255,255,255,0.5)
        `,
      }}>
        MAXIMIZE
      </h1>
    </AbsoluteFill>
  );
};
