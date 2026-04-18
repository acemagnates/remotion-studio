import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip03 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const drawProgress = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const splitProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const horizontalOffset = interpolate(splitProgress, [0, 1], [0, width / 2 + 100]);

  // ACT 2: HOLD + EVOLUTION
  const revealZoom = interpolate(frame, [30, durationInFrames], [1, 0.9]);

  // ACT 3: EXIT
  const exitProgress = spring({
    frame: frame - (durationInFrames - 15),
    fps,
    config: { damping: 15, stiffness: 200 },
  });
  const snapBack = interpolate(exitProgress, [0, 1], [0, 1]);

  const currentSplitOffset = interpolate(snapBack, [0, 1], [horizontalOffset, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Revealed Corporate Background */}
      <AbsoluteFill
        style={{
          backgroundColor: "#FFF",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${revealZoom})`,
        }}
      >
        <div style={{ textAlign: "center", color: "#000", fontFamily: "sans-serif" }}>
          <h2 style={{ fontSize: 40, fontWeight: 900 }}>CORPORATE</h2>
          <div style={{ width: 400, height: 200, border: "4px solid #000", margin: "20px auto" }} />
          <p style={{ fontSize: 24 }}>BOARDROOM TABLE</p>
        </div>
      </AbsoluteFill>

      {/* Obsidian Panels */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          transform: `translateX(${-currentSplitOffset}px)`,
          borderRight: "2px solid #C9A84C",
          boxShadow: "10px 0 30px rgba(0,0,0,0.8)",
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          transform: `translateX(${currentSplitOffset}px)`,
          borderLeft: "2px solid #C9A84C",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.8)",
          zIndex: 10,
        }}
      />

      {/* Kintsugi Crack (SVG) */}
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          zIndex: 20,
          pointerEvents: "none",
          opacity: interpolate(splitProgress, [0, 0.5], [1, 0]),
        }}
      >
        <path
          d={`M ${width / 2} 0 L ${width / 2 + 10} 200 L ${width / 2 - 15} 400 L ${width / 2 + 5} 800 L ${width / 2 - 10} 1200 L ${width / 2 + 20} 1600 L ${width / 2} ${height}`}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="6"
          strokeDasharray="2000"
          strokeDashoffset={2000 * (1 - drawProgress)}
          style={{ filter: "drop-shadow(0 0 8px #C9A84C)" }}
        />
      </svg>
    </AbsoluteFill>
  );
};
