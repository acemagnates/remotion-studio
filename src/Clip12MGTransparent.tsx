import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Clip12MGTransparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const text = "LEARNING PROTOCOL_ACTIVE";

  // ACT 1: ENTRANCE (Typewriter)
  const charsShown = Math.floor(interpolate(frame, [0, 30], [0, text.length], {
    extrapolateRight: "clamp",
  }));
  const currentText = text.slice(0, charsShown);

  // ACT 2: EVOLUTION (Glitch every 0.5s / 15 frames)
  const isGlitching = (frame % 15) < 3 && frame > 30;
  const glitchOffset = isGlitching ? (Math.random() - 0.5) * 10 : 0;
  const rgbSplit = isGlitching ? 4 : 0;

  // ACT 3: EXIT (Turn red and cut)
  const exitSoon = frame > durationInFrames - 10;
  const exitColor = exitSoon ? "red" : "#C9A84C";
  const opacity = frame > durationInFrames - 2 ? 0 : 1;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      <div style={{
        fontFamily: "monospace",
        fontSize: 72,
        color: exitColor,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: "4px",
        textShadow: `
          ${rgbSplit}px 0 rgba(255,0,0,0.7), 
          ${-rgbSplit}px 0 rgba(0,255,255,0.7),
          0 0 20px rgba(201,168,76,0.6)
        `,
        transform: `translateX(${glitchOffset}px)`,
      }}>
        {currentText}
        {frame % 10 < 5 && "_"}
      </div>
    </AbsoluteFill>
  );
};
