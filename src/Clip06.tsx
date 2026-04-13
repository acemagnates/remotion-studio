import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip06 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const cardSpring = spring({ frame, fps, config: { damping: 200 } });
  const cardY = interpolate(cardSpring, [0, 1], [300, 0]);
  const cardScale = interpolate(frame, [0, durationInFrames], [1, 1.01]);

  const headerFade = interpolate(frame, [10, 20], [0, 1], { extrapolateRight: "clamp" });

  // ACT 2: TYPE-ON
  const bodyText = "Meetings created by you: 0 of 11";
  const charIndex = Math.floor(interpolate(frame, [25, 65], [0, bodyText.length], { extrapolateRight: "clamp" }));
  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

  const separatorProgress = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: "clamp" });
  const attributionFade = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: "clamp" });

  const borderPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div style={{
        position: "absolute",
        bottom: "25%",
        left: "50%",
        transform: `translateX(-50%) translateY(${cardY}px) scale(${cardScale})`,
        width: "80%",
        height: "18%",
        backgroundColor: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(16px)",
        border: `${borderPulse}px solid #C9A84C`,
        borderRadius: "4px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box"
      }}>
        {/* Heading */}
        <div style={{
            color: "#C9A84C",
            fontFamily: "Inter, sans-serif",
            fontSize: 24,
            fontWeight: 700,
            textTransform: "uppercase",
            opacity: headerFade,
            letterSpacing: "0.1em"
        }}>
            CALENDAR OWNERSHIP AUDIT
        </div>

        {/* Body */}
        <div style={{
            color: "#FFF",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 42,
            fontWeight: 400
        }}>
            {bodyText.slice(0, charIndex)}
            {frame >= 25 && frame < 90 && cursorBlink && <span style={{ backgroundColor: "#FFF", marginLeft: 2 }}>&nbsp;</span>}
        </div>

        {/* Separator */}
        <div style={{
            width: `${separatorProgress * 100}%`,
            height: 1,
            backgroundColor: "#C9A84C",
            opacity: 0.5
        }} />

        {/* Attribution */}
        <div style={{
            color: "#C9A84C",
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            fontStyle: "italic",
            opacity: attributionFade
        }}>
            Week of [current week] · Remote Operations
        </div>
      </div>
    </AbsoluteFill>
  );
};
