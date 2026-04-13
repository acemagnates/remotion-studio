import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Clip15 = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const panelFade = interpolate(frame, [0, 9], [0, 1], { extrapolateRight: "clamp" });
  const drift = interpolate(frame, [0, durationInFrames], [1, 1.01]);

  // Typing logic
  const line1 = "ACCESS LEVEL: SELF";
  const line2 = "PERMISSION REQUIRED: NONE";
  
  const char1 = Math.floor(interpolate(frame, [9, 30], [0, line1.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const char2 = Math.floor(interpolate(frame, [45, 75], [0, line2.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  const cursorBlink = Math.floor(frame / 15) % 2 === 0;

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 9, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: `translateX(-50%) scale(${drift})`,
        width: "80%",
        height: "250px",
        backgroundColor: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(12px)",
        border: "1px solid #C9A84C",
        borderRadius: "4px",
        padding: "40px",
        boxSizing: "border-box",
        overflow: "hidden",
        opacity: panelFade
      }}>
        {/* Scanlines */}
        <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: "repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0.04) 1px, rgba(0,0,0,0) 2px)",
            pointerEvents: "none"
        }} />

        <div style={{
            color: "#C9A84C",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 32,
            lineHeight: "1.5em",
            letterSpacing: "0.1em"
        }}>
            <div>
                {line1.slice(0, char1)}
                {frame >= 9 && frame < 45 && cursorBlink && <span style={{ backgroundColor: "#C9A84C", marginLeft: 2 }}>&nbsp;</span>}
            </div>
            <div>
                {line2.slice(0, char2)}
                {frame >= 45 && cursorBlink && <span style={{ backgroundColor: "#C9A84C", marginLeft: 2 }}>&nbsp;</span>}
            </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
