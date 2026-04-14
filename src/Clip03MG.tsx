import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const Clip03MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const text1 = "$0.00";
  const text2 = " FREE";
  const fullText = text1 + text2;

  // ACT 1: ENTRANCE (Typewriter)
  const charsShown = Math.floor(interpolate(frame, [0, 30], [0, fullText.length], {
    extrapolateRight: "clamp",
  }));
  const currentText = fullText.slice(0, charsShown);
  const cursorOpacity = Math.sin(frame * 0.3) > 0 ? 1 : 0;

  // ACT 2: EVOLUTION (Scale and Glow Pulse)
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.1]);
  const glowIntensity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [10, 25]
  );

  // ACT 3: EXIT (Blur and Fade)
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blur = interpolate(exit, [0, 1], [0, 50]);
  const opacity = interpolate(exit, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity }}>
      {/* Scanlines */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          zIndex: 10,
          backgroundSize: "100% 4px, 3px 100%",
          pointerEvents: "none"
        }}
      />
      
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ 
          fontFamily: "monospace", 
          fontSize: 120, 
          color: "white", 
          transform: `scale(${scale})`,
          filter: `blur(${blur}px)`,
          textTransform: "uppercase",
          letterSpacing: "4px"
        }}>
          <span>{currentText.slice(0, text1.length)}</span>
          <span style={{ 
            color: "#C9A84C", 
            textShadow: `0 0 ${glowIntensity}px rgba(201, 168, 76, 0.8)` 
          }}>
            {currentText.slice(text1.length)}
          </span>
          {charsShown < fullText.length && (
            <span style={{ opacity: cursorOpacity, backgroundColor: "white", marginLeft: 5 }}>&nbsp;</span>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
