import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip12MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const text = "> 0 ACTIVE HOURS";
  const charsShown = Math.floor(interpolate(frame, [0, 20], [0, text.length], { extrapolateRight: "clamp" }));
  const shownText = text.slice(0, charsShown);

  const cursorBlink = Math.floor(frame / 10) % 2 === 0;

  // ACT 2: HOLD + EVOLUTION
  const drift = interpolate(frame, [0, durationInFrames], [0, 50]);
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.03]);

  // ACT 3: EXIT
  const exitFrame = durationInFrames - 15;
  const isExiting = frame >= exitFrame;
  const flashRed = isExiting && Math.floor(frame / 5) % 2 === 0;
  const finalOpacity = interpolate(frame, [durationInFrames - 2, durationInFrames], [1, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: finalOpacity }}>
      <div style={{ transform: `scale(${scale}) translateY(${drift}px)` }}>
        <h1
          style={{
            fontFamily: "Courier New, monospace",
            fontSize: 100,
            color: flashRed ? "#F00" : "#FFF",
            margin: 0,
            textShadow: `0 0 20px ${flashRed ? "rgba(255,0,0,0.8)" : "rgba(255,0,0,0.4)"}`,
          }}
        >
          {shownText}
          {cursorBlink && <span style={{ backgroundColor: flashRed ? "#F00" : "#FFF", marginLeft: 10 }}>&nbsp;</span>}
        </h1>
      </div>
      
      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
          backgroundSize: "100% 10px",
          transform: `translateY(${frame * 2}px)`,
          pointerEvents: "none"
        }}
      />
    </AbsoluteFill>
  );
};
