import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip09 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const enterSpring = spring({ frame, fps, config: { damping: 200 } });
  
  // Transition Phase (Word A -> Word B)
  // 0s - 0.8s: Hold A
  // 0.8s - 1.5s: Morph
  // 1.5s - 3.0s: Hold B (Lock at 2.0s)
  // 3.0s - 3.5s: Exit
  
  const morphProgress = interpolate(frame, [24, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });

  const blurIntensity = interpolate(frame, [24, 35, 45], [0, 25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  
  // Word A (YES)
  const aOpacity = interpolate(morphProgress, [0, 0.4], [1, 0]);
  const aScale = interpolate(morphProgress, [0, 1], [1, 1.15]);
  
  // Word B (NO)
  const bLockSpring = spring({ frame, fps, delay: 60, config: { damping: 12, stiffness: 200 } });
  const bOpacity = interpolate(morphProgress, [0.6, 1], [0, 1]);
  const bScale = interpolate(morphProgress, [0.6, 1], [1.3, 1]) * interpolate(frame, [0, durationInFrames], [1, 1.05]);

  const bloomGlow = frame >= 60 ? "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)" : "none";

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", filter: `blur(${blurIntensity}px)` }}>
        {/* Word YES */}
        <div style={{
            position: "absolute",
            color: "#FFF",
            fontFamily: "Inter, sans-serif",
            fontSize: 480,
            fontWeight: 900,
            opacity: aOpacity * enterSpring,
            transform: `scale(${aScale})`
        }}>
            YES
        </div>

        {/* Word NO */}
        <div style={{
            position: "absolute",
            color: "#FFF",
            fontFamily: "Inter, sans-serif",
            fontSize: 480,
            fontWeight: 900,
            opacity: bOpacity,
            transform: `scale(${bScale})`,
            textShadow: bloomGlow
        }}>
            NO
        </div>
      </AbsoluteFill>

      {/* Subtext */}
      <div style={{
        position: "absolute",
        top: "70%",
        width: "100%",
        textAlign: "center",
        color: "#C9A84C",
        fontFamily: "Inter, sans-serif",
        fontSize: 42,
        fontWeight: 400,
        letterSpacing: "0.4em"
      }}>
        <div style={{ position: "absolute", width: "100%", opacity: 1 - morphProgress }}>
            DEFAULT ANSWER.
        </div>
        <div style={{ position: "absolute", width: "100%", opacity: morphProgress }}>
            DELIBERATE CHOICE.
        </div>
      </div>
    </AbsoluteFill>
  );
};
