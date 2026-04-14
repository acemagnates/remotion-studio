import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip06: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Slide + Tilt)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const translateY = interpolate(entrance, [0, 1], [1000, 0]);
  const rotateX = interpolate(entrance, [0, 1], [20, 0]);

  // ACT 2: HOLD + EVOLUTION (Typewriter + Redaction)
  const text = "DESIRABILITY ELO SCORE";
  const typewriterProgress = interpolate(frame, [15, 60], [0, text.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const displayedText = text.slice(0, Math.floor(typewriterProgress));

  const drift = interpolate(frame, [0, durationInFrames], [0, -50]);

  // Redaction lines (simplified for example, using divs as blocks)
  const redactionProgress = spring({
    frame: frame - 30,
    fps,
    config: { stiffness: 100 },
  });

  // ACT 3: EXIT
  const exit = spring({
    frame: frame - (durationInFrames - 15),
    fps,
  });
  const exitScale = interpolate(exit, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        width: 800,
        height: 1200,
        backgroundColor: "#F5F5DC",
        border: "2px solid #C9A84C",
        padding: 60,
        transform: `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY + drift}px) scale(${exitScale})`,
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}>
        <h3 style={{ fontFamily: "Courier New, monospace", fontSize: 60, color: "#000", margin: 0 }}>
          {displayedText}
          <span style={{ opacity: frame % 10 < 5 ? 1 : 0 }}>|</span>
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ position: "relative", height: 30, backgroundColor: "#ccc", width: i === 2 ? "60%" : "90%" }}>
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                height: "100%", 
                backgroundColor: "#000",
                width: i <= 2 ? `${redactionProgress * 100}%` : 0
              }} />
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
