import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const NumberFourLines = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const snap = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const lineProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      <h1
        style={{
          fontSize: 600,
          color: "#C9A84C",
          fontWeight: 900,
          transform: `scale(${snap})`,
          textShadow: "0 0 40px rgba(201, 168, 76, 0.6)",
          zIndex: 10,
          fontFamily: "Inter, sans-serif",
        }}
      >
        4
      </h1>

      {/* Shooting lines */}
      {[0, 1, 2, 3].map((i) => {
        const angle = i * 90;
        const length = interpolate(lineProgress, [0, 1], [0, 1500]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: length,
              height: 10,
              backgroundColor: "#C9A84C",
              boxShadow: "0 0 20px #C9A84C",
              transform: `rotate(${angle}deg) translateX(${350}px)`,
              transformOrigin: "left center",
              opacity: interpolate(lineProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
