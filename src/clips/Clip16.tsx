import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Clip16: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Scanline motion
  const scanlineY = (frame * 10) % 1920;

  // ACT 1: TYPEWRITER
  const fullText = "> SYSTEM_RULE: PUNISH_DESPERATION";
  const typeProgress = interpolate(frame, [0, 20], [0, fullText.length], {
    extrapolateRight: "clamp",
  });
  const displayedText = fullText.slice(0, Math.floor(typeProgress));

  // ACT 2: GLOW PULSE
  const glowOpacity = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.3, 0.7]);

  // ACT 3: DELETE
  const deleteStart = durationInFrames - 15;
  const deleteProgress = interpolate(frame, [deleteStart, durationInFrames], [0, fullText.length], {
    extrapolateLeft: "clamp",
  });
  const finalText = displayedText.slice(0, Math.max(0, displayedText.length - Math.floor(deleteProgress)));

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", padding: 80, justifyContent: "center" }}>
      {/* Scanline */}
      <div style={{
        position: "absolute",
        top: scanlineY,
        left: 0,
        width: "100%",
        height: 4,
        background: "rgba(201, 168, 76, 0.1)",
        boxShadow: "0 0 10px rgba(201, 168, 76, 0.2)",
      }} />

      {/* Red Glow Background Layer */}
      <AbsoluteFill style={{
        background: `radial-gradient(circle, rgba(255, 0, 0, ${glowOpacity * 0.4}) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <h1 style={{
        fontFamily: "Courier New, monospace",
        fontSize: 70,
        color: "#C9A84C",
        fontWeight: "bold",
        margin: 0,
        lineHeight: 1.4,
        textShadow: "0 0 12px rgba(201, 168, 76, 0.8)",
      }}>
        {finalText}
        <span style={{ 
          display: "inline-block", 
          width: 40, 
          height: 60, 
          backgroundColor: "#C9A84C", 
          marginLeft: 10,
          opacity: frame % 10 < 5 ? 1 : 0,
          verticalAlign: "middle"
        }} />
      </h1>
    </AbsoluteFill>
  );
};
