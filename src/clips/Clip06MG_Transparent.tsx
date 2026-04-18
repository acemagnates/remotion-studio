import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip06MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const lineDraw = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 }
  });
  
  const textSlide = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 120 }
  });

  // ACT 2: HOLD + EVOLUTION
  const drift = interpolate(frame, [0, durationInFrames], [0, 30]);
  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.6, 1]);

  // ACT 3: EXIT
  const exit = spring({
    frame: frame - (durationInFrames - 15),
    fps,
    config: { damping: 20, stiffness: 100 }
  });
  const exitOpacity = interpolate(exit, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      <div style={{
        position: "absolute",
        bottom: 300,
        left: 100,
        opacity: exitOpacity,
        transform: `translateX(${drift}px)`
      }}>
        {/* Gold Line */}
        <div style={{
          width: interpolate(lineDraw, [0, 1], [0, 700]) * interpolate(exit, [0, 1], [1, 0]),
          height: 6,
          backgroundColor: "#C9A84C",
          boxShadow: `0 0 20px rgba(201,168,76,${pulse})`,
          marginBottom: 10,
          borderRadius: 3
        }} />
        
        {/* Text Area */}
        <div style={{
            overflow: "hidden",
            height: 120
        }}>
            <h2 style={{
                color: "#FFF",
                fontSize: 90,
                fontWeight: 900,
                margin: 0,
                fontFamily: "Inter, sans-serif",
                transform: `translateY(${interpolate(textSlide, [0, 1], [120, 0])}px)`,
                textShadow: "0 4px 15px rgba(0,0,0,0.8)"
            }}>
                THE EXPERIMENT
            </h2>
        </div>
      </div>
    </AbsoluteFill>
  );
};
