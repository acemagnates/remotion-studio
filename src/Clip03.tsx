import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip03 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const lineProgress = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });

  const textSpring = spring({ frame, fps, delay: 9, config: { damping: 200 } });
  const textSlide = interpolate(textSpring, [0, 1], [-15, 0]);

  // ACT 2: HOLD + EVOLUTION
  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.85, 1]);
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.015]);

  // ACT 3: EXIT
  const exitProgress = interpolate(frame, [durationInFrames - 15, durationInFrames - 6], [1, 0], { extrapolateLeft: "clamp" });
  const lineRetract = interpolate(frame, [durationInFrames - 15, durationInFrames - 6], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill>
      {/* Lower Third Container */}
      <div style={{
        position: "absolute",
        top: "75%",
        left: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        transform: `scale(${scale})`,
        opacity: exitProgress
      }}>
        {/* Backing Panel */}
        <div style={{
            position: "absolute",
            width: "120%",
            height: "120%",
            backgroundColor: "rgba(10, 10, 10, 0.75)",
            filter: "blur(8px)",
            borderRadius: "40px",
            zIndex: -1,
            left: "-10%",
            top: "-10%"
        }} />

        {/* Gold Accent Line */}
        <div style={{
            width: `${35 * lineProgress * lineRetract}%`,
            height: 3,
            backgroundColor: "#C9A84C",
            marginBottom: 10,
            opacity: pulse
        }} />

        {/* Text Area */}
        <div style={{ transform: `translateX(${textSlide}px)`, opacity: textSpring }}>
            <div style={{
                color: "#FFF",
                fontFamily: "Inter, sans-serif",
                fontSize: 64,
                fontWeight: 900,
                textTransform: "uppercase"
            }}>
                DEREK
            </div>
            <div style={{
                color: "#C9A84C",
                fontFamily: "Inter, sans-serif",
                fontSize: 32,
                fontWeight: 400
            }}>
                Operations Manager · Remote
            </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
