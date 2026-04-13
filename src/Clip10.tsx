import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip10 = () => {
  const frame = useCurrentFrame();
  const { fps, width, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0-0.5s)
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 200 }
  });
  const cardY = interpolate(cardSpring, [0, 1], [200, 0]);

  const topLineWidth = interpolate(frame, [0, 30], [0, 100], { extrapolateRight: "clamp" });

  // ACT 2: HOLD + EVOLUTION (0.5-2.0s)
  const text = "6 months later...";
  const charsShown = Math.floor(interpolate(frame, [30, 90], [0, text.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }));

  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

  const attributionOpacity = interpolate(frame, [90, 114], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const driftScale = interpolate(frame, [30, 120], [1, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const linePulse = interpolate(
    Math.sin((frame / fps) * (Math.PI / 0.4)),
    [-1, 1],
    [0.7, 1]
  );

  // ACT 3: EXIT (2.0-2.5s)
  const exitOpacity = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp"
  });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity }}>
      <div style={{
        position: "absolute",
        bottom: "25%",
        left: 0,
        width: "100%",
        height: 90,
        backgroundColor: "rgba(10, 10, 10, 0.88)",
        border: "1px solid #C9A84C",
        transform: `translateY(${cardY}px) scale(${driftScale})`,
        padding: "15px 30px",
        boxSizing: "border-box",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        {/* Gold Border Top */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 2,
          backgroundColor: "#C9A84C",
          width: `${topLineWidth}%`,
          opacity: linePulse
        }} />

        <div style={{ color: "white", fontSize: 16 }}>
          {text.substring(0, charsShown)}
          {frame < 120 && cursorBlink && "|"}
        </div>
        
        <div style={{ 
          color: "#C9A84C", 
          fontSize: 13, 
          marginTop: 8, 
          opacity: attributionOpacity 
        }}>
          — every creator who never launched.
        </div>
      </div>
    </AbsoluteFill>
  );
};
