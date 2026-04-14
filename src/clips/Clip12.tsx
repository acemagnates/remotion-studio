import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Axes + Line)
  const drawProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const lineProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // ACT 2: HOLD + EVOLUTION (Glow + Arrow)
  const arrowPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.8, 1.1]);
  const bgPan = interpolate(frame, [0, durationInFrames], [40, 60]);

  // ACT 3: EXIT
  const exit = spring({
    frame: frame - (durationInFrames - 15),
    fps,
  });
  const exitScale = interpolate(exit, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ 
      background: `radial-gradient(circle at ${bgPan}% 50%, #1a1a1a 0%, #0a0a0a 100%)`,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ 
        width: 800, 
        height: 1000, 
        position: "relative",
        transform: `scale(${exitScale})`
      }}>
        {/* Axes */}
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 4, backgroundColor: "#FFF", transform: `scaleX(${drawProgress})`, transformOrigin: "left" }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 4, height: "100%", backgroundColor: "#FFF", transform: `scaleY(${drawProgress})`, transformOrigin: "bottom" }} />
        
        {/* Labels */}
        <div style={{ position: "absolute", left: "50%", bottom: -60, transform: "translateX(-50%)", color: "#FFF", fontSize: 40, fontFamily: "monospace", opacity: drawProgress }}>SWIPES</div>
        <div style={{ position: "absolute", left: -120, top: "50%", transform: "translateY(-50%) rotate(-90deg)", color: "#FFF", fontSize: 40, fontFamily: "monospace", opacity: drawProgress }}>MATCHES</div>

        {/* Data Line */}
        <svg style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
          <line
            x1="0"
            y1="1000"
            x2={interpolate(lineProgress, [0, 1], [0, 800])}
            y2={interpolate(lineProgress, [0, 1], [1000, 200])}
            stroke="#FFF"
            strokeWidth="8"
            style={{ filter: "drop-shadow(0 0 10px #FFF)" }}
          />
        </svg>

        {/* Arrow */}
        <div style={{ 
          position: "absolute", 
          right: 100, 
          top: 100, 
          fontSize: 120, 
          color: "#00FF00", 
          transform: `scale(${arrowPulse})`,
          opacity: lineProgress,
          textShadow: "0 0 20px #00FF00"
        }}>
          UP ↑
        </div>
      </div>
    </AbsoluteFill>
  );
};
