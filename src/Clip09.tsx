import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip09 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0-0.6s)
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 200 }
  });
  const entranceScale = interpolate(entranceSpring, [0, 1], [0.8, 1]);
  const entranceOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  // ACT 2: HOLD + MORPH (0.6-2.8s)
  // Morph starts at 1.2s (72 frames)
  // Phase 1: Blur out (72-96)
  // Phase 2: Blur in (96-120)
  
  const blurProgress = interpolate(frame, [72, 96, 120], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const blurAmount = blurProgress * 12;

  const opacity1 = interpolate(frame, [84, 96], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const opacity2 = interpolate(frame, [96, 108], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const engineBounce = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 200 }
  });
  const engineScale = interpolate(engineBounce, [0, 1], [0.8, 1]);

  const goldBloom = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // ACT 3: EXIT (2.8-3.5s)
  const finalScale = interpolate(frame, [168, 210], [1, 1.1], {
    extrapolateLeft: "clamp"
  });
  const exitOpacity = interpolate(frame, [168, 210], [1, 0], {
    extrapolateLeft: "clamp"
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#0A0A0A", 
      fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>
      <div style={{
        fontSize: 52,
        fontWeight: 900,
        textAlign: "center",
        filter: `blur(${blurAmount}px)`,
        opacity: exitOpacity,
        transform: `scale(${finalScale * (frame < 96 ? entranceScale : engineScale)})`
      }}>
        {frame < 96 ? (
          <div style={{ opacity: opacity1 }}>HIS ENEMY</div>
        ) : (
          <div style={{ 
            color: "#C9A84C", 
            opacity: opacity2,
            textShadow: `0 0 ${12 * goldBloom}px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)`
          }}>
            THE ENGINE
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
