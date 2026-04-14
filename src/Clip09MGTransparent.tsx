import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Clip09MGTransparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const text = "not the algorithm.";
  
  // Timings
  // ACT 1: ENTRANCE (0.0-0.7s) -> 0 to 21 frames
  const typingDuration = text.length * 2; // 36 frames
  const holdStart = typingDuration;
  const holdDuration = 12; // 0.4s hold
  const deletionStart = holdStart + holdDuration;
  const deletionDuration = text.length * 2; // another 36 frames

  // ACT 2: HOLD + EVOLUTION
  // typing
  const charsVisible = Math.max(0, Math.min(text.length, Math.floor(frame / 2)));
  
  // deletion
  const charsRemaining = frame < deletionStart 
    ? charsVisible 
    : Math.max(0, text.length - Math.floor((frame - deletionStart) / 2));

  const currentText = text.slice(0, charsRemaining);

  // Blinking cursor
  const cursorOpacity = Math.floor(frame / 12) % 2 === 0 ? 1 : 0;

  // ACT 3: EXIT (1.9-2.5s)
  const linePulseStart = deletionStart + deletionDuration;
  const lineOpacity = interpolate(
    frame - linePulseStart,
    [0, 9, 18],
    [0, 1, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: "30%",
          width: "100%",
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 80,
          fontWeight: "bold",
          color: "#C9A84C",
        }}
      >
        {currentText}
        <span style={{ opacity: cursorOpacity }}>|</span>
      </div>

      {/* Pulse Line */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 400,
          height: 2,
          backgroundColor: "#C9A84C",
          opacity: lineOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
