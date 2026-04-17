import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip01MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (0 - 1s)
  const lineEntrance = spring({
    frame,
    fps,
    config: { damping: 20 },
    durationInFrames: 15,
  });

  const textSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // ACT 3: EXIT (2.5 - 3.0s)
  const exitStart = durationInFrames - 15;
  const exitSpring = spring({
    frame: frame - exitStart,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // ANIMATIONS
  // Gold Line Drawing (L -> R)
  const lineProgress = interpolate(lineEntrance, [0, 1], [0, 1]) * (1 - exitSpring);
  
  // Text Slide Up
  const textY = interpolate(textSpring, [0, 1], [100, 0]) + interpolate(exitSpring, [0, 1], [0, 100]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]) * (1 - exitSpring);

  // ACT 2: HOLD + EVOLUTION (1.5 - 2.5s)
  const pulse = interpolate(
    Math.sin((frame / 30) * Math.PI * 2),
    [-1, 1],
    [0.7, 1.0]
  );

  const lineW = 600;

  return (
    <AbsoluteFill>
      {/* Lower Third Container */}
      <div style={{ position: "absolute", bottom: height * 0.15, left: width * 0.15 }}>
        
        {/* Text Mask Area */}
        <div style={{ 
          position: "absolute", 
          overflow: "hidden", 
          width: 800, 
          height: 120, 
          bottom: 12,
          left: 0
        }}>
          <h2 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 48,
            fontWeight: 900,
            color: "white",
            margin: 0,
            transform: `translateY(${textY}px)`,
            opacity: textOpacity,
            letterSpacing: "0.05em",
            textShadow: "0 0 12px rgba(0,0,0,0.8)"
          }}>
            2022: THE FRICTIONLESS ERA
          </h2>
        </div>

        {/* Gold Accent Line */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: lineW * lineProgress,
          height: 2,
          backgroundColor: "#C9A84C",
          opacity: pulse,
          boxShadow: "0 0 12px rgba(201,168,76,0.8), 0 0 20px rgba(201,168,76,0.4)"
        }} />
      </div>
    </AbsoluteFill>
  );
};
