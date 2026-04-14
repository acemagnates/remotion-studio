import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Slide up)
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 20,
      stiffness: 200,
    },
  });

  const translateY = interpolate(entrance, [0, 1], [400, 0]);

  // ACT 2: HOLD + EVOLUTION (Shimmer)
  const shimmerPos = interpolate(
    frame % 60,
    [0, 60],
    [-100, 200]
  );

  // ACT 3: EXIT (Slide down)
  const exitStart = durationInFrames - 15;
  const exitSpring = spring({
    frame: frame - exitStart,
    fps,
    config: {
      damping: 20,
      stiffness: 200,
    },
  });
  const exitTranslateY = interpolate(exitSpring, [0, 1], [0, 400]);

  return (
    <AbsoluteFill style={{ 
      justifyContent: "flex-end", 
      alignItems: "center",
      paddingBottom: 200,
      opacity: interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0]),
    }}>
      <div
        style={{
          width: 600,
          height: 150,
          backgroundColor: "#0A0A0A",
          border: "1px solid #C9A84C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          transform: `translateY(${translateY + exitTranslateY}px)`,
          // backdropFilter is BANNED as per protocol, using semi-transparent bg instead
          background: "rgba(10, 10, 10, 0.9)", 
        }}
      >
        {/* Shimmer Effect */}
        <div style={{
          position: "absolute",
          top: 0,
          left: `${shimmerPos}%`,
          width: "20%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.4), transparent)",
          transform: "skewX(-20deg)",
        }} />

        <h2 style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 80,
          color: "#FFFFFF",
          fontWeight: 900,
          margin: 0,
          letterSpacing: "0.1em",
        }}>
          RANKED
        </h2>
      </div>
    </AbsoluteFill>
  );
};
