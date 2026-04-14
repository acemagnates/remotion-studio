import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const Clip08MGTransparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const lineDraw = interpolate(frame, [0, 20], [0, 600], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  
  const textEntrance = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textSlide = interpolate(textEntrance, [0, 1], [20, 0]);

  // ACT 2: EVOLUTION (Shine sweep)
  const shinePos = interpolate(frame, [30, durationInFrames], [-100, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
  });
  const lineRetract = interpolate(exit, [0, 1], [600, 0]);
  const textExitOpacity = interpolate(exit, [0, 1], [1, 0]);
  const textExitSlide = interpolate(exit, [0, 1], [0, 20]);

  return (
    <AbsoluteFill>
      <div style={{
        position: "absolute",
        bottom: 200,
        left: 100,
      }}>
        {/* Text */}
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 64,
          fontWeight: 900,
          color: "white",
          opacity: textEntrance * textExitOpacity,
          transform: `translateY(${textSlide + textExitSlide}px)`,
          marginBottom: 10,
          letterSpacing: "2px",
          textShadow: "0 0 10px rgba(0,0,0,0.5)"
        }}>
          DEFENSE GIANTS
        </div>

        {/* Gold Line */}
        <div style={{
          width: exit > 0 ? lineRetract : lineDraw,
          height: 2,
          backgroundColor: "#C9A84C",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(201,168,76,0.8)"
        }}>
          {/* Shine */}
          <div style={{
            position: "absolute",
            top: 0,
            left: `${shinePos}%`,
            width: "30%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, white, transparent)",
            opacity: 0.8
          }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
