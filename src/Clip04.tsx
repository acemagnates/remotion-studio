import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip04 = () => {
  const frame = useCurrentFrame();
  const { fps, width, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0-0.5s)
  const lineDraw = interpolate(frame, [0, 24], [0, 400], {
    extrapolateRight: "clamp"
  });

  const textSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 }
  });
  const textX = interpolate(textSpring, [0, 1], [-50, 0]);

  const careerSuicideOpacity = interpolate(frame, [30, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // ACT 2: HOLD + EVOLUTION (0.5-2.0s)
  const linePulse = interpolate(
    Math.sin((frame / fps) * (Math.PI / 0.45)), // 0.9s cycle
    [-1, 1],
    [0.7, 1]
  );
  const careerScale = interpolate(frame, [30, 120], [1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // ACT 3: EXIT (2.0-2.5s)
  const exitLineDraw = interpolate(frame, [durationInFrames - 30, durationInFrames], [400, 0], {
    extrapolateLeft: "clamp"
  });
  const exitOpacity = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp"
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "10%",
        width: "80%",
        height: 90,
        backgroundColor: "rgba(10, 10, 10, 0.85)",
        border: "1px solid #C9A84C",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "sans-serif"
      }}>
        {/* Accent Line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 2,
          backgroundColor: "#C9A84C",
          width: frame > durationInFrames - 30 ? exitLineDraw : lineDraw,
          opacity: linePulse
        }} />

        <div style={{ 
          transform: `translateX(${textX}px)`, 
          opacity: textSpring,
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 4 }}>
            Month 4
          </div>
          <div style={{ 
            color: "#C9A84C", 
            fontSize: 14, 
            opacity: careerSuicideOpacity,
            transform: `scale(${careerScale})`
          }}>
            Career Suicide?
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
