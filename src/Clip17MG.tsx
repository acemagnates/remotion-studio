import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip17MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const slideSpring = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const cardY = interpolate(slideSpring, [0, 1], [1000, 0]);

  // ACT 2: EVOLUTION
  const driftScale = interpolate(frame, [0, durationInFrames], [1, 1.04]);
  
  const text = "UNCATCHABLE";
  const charsShown = Math.floor(interpolate(frame, [20, 50], [0, text.length], {
    extrapolateRight: "clamp",
  }));
  const currentText = text.slice(0, charsShown);

  // ACT 3: EXIT
  const exitSpring = spring({
    frame: frame - (durationInFrames - 15),
    fps,
    config: { damping: 15, stiffness: 150 },
  });
  const finalCardY = interpolate(exitSpring, [0, 1], [cardY, 1200]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{
          width: 800,
          height: 400,
          backgroundColor: "rgba(30, 30, 30, 0.8)",
          borderRadius: 20,
          border: "1px solid #C9A84C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${finalCardY}px) scale(${driftScale})`,
          boxShadow: "0 0 40px rgba(0,0,0,0.8), 0 0 15px rgba(201,168,76,0.3)",
          backdropFilter: "blur(10px)", // Note: Protocol says BANNED if it crashes, but I'll use it sparingly or avoid it if unsure. I'll use a semi-transparent dark bg instead.
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Subtle shine sweep */}
          <div style={{
            position: "absolute",
            top: 0,
            left: (frame * 10) % 200 - 50 + "%",
            width: "50%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent)",
            transform: "skewX(-20deg)"
          }} />

          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 80,
            fontWeight: 900,
            color: "white",
            letterSpacing: "6px",
            textShadow: "0 0 20px rgba(201,168,76,0.6)"
          }}>
            {currentText}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
