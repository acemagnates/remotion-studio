import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip05MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const lineDraw = spring({
    frame,
    fps,
    config: { damping: 20 },
    durationInFrames: 12,
  });

  const textSlide = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const lineWidth = interpolate(lineDraw, [0, 1], [0, 600]);
  const textY = interpolate(textSlide, [0, 1], [100, 0]);
  const textOpacity = interpolate(textSlide, [0, 0.5], [0, 1]);

  // ACT 2: HOLD + EVOLUTION
  const shimmer = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.6, 1]
  );
  const drift = interpolate(frame, [0, durationInFrames], [0, 15]);

  // ACT 3: EXIT
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp" }
  );
  
  const exitSlide = interpolate(exit, [0, 1], [0, 100]);
  const exitLine = interpolate(exit, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ padding: "100px", justifyContent: "flex-end", alignItems: "flex-start", transform: `translateX(${drift}px)` }}>
      <div style={{ position: "relative", overflow: "hidden", height: 150, width: 700 }}>
        {/* Gold Line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 4,
            width: lineWidth * exitLine,
            backgroundColor: "#C9A84C",
            boxShadow: `0 0 15px rgba(201, 168, 76, ${shimmer})`,
          }}
        />
        
        {/* Text */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            transform: `translateY(${textY + exitSlide}px)`,
            opacity: textOpacity,
          }}
        >
          <h2 style={{ fontFamily: "Arial, sans-serif", fontSize: 60, color: "#FFF", fontWeight: 700, margin: 0, letterSpacing: 4 }}>
            ELIAS <span style={{ color: "#C9A84C" }}>//</span> ANALYST
          </h2>
        </div>
      </div>
    </AbsoluteFill>
  );
};
