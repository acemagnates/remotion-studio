import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

const BRANCHES = [
  "M 540 960 L 600 800 L 750 750",
  "M 540 960 L 450 850 L 300 900",
  "M 540 960 L 580 1100 L 700 1250",
  "M 540 960 L 480 1150 L 350 1300",
  "M 540 960 L 650 900 L 850 950",
  "M 540 960 L 400 1000 L 200 950",
];

export const Clip21MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const shootProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200 },
    durationInFrames: 20,
  });

  const panelsSplit = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const panelOffset = interpolate(panelsSplit, [0, 1], [0, 100]);
  const glowPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.7, 1]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1], { extrapolateLeft: "clamp" });
  const whiteFlash = interpolate(exit, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", overflow: "hidden" }}>
      {/* Background Light */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(circle, #FFF 0%, #C9A84C 50%, transparent 100%)",
          opacity: (0.3 + panelsSplit * 0.4) * glowPulse,
          transform: `scale(${1 + panelsSplit * 2})`,
        }}
      />

      {/* Panels */}
      <div style={{ position: "absolute", top: 0, left: -panelOffset, width: "50%", height: "100%", backgroundColor: "#0A0A0A", borderRight: "2px solid #C9A84C" }} />
      <div style={{ position: "absolute", top: 0, right: -panelOffset, width: "50%", height: "100%", backgroundColor: "#0A0A0A", borderLeft: "2px solid #C9A84C" }} />

      {/* Veins */}
      <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, zIndex: 5 }}>
        {BRANCHES.map((d, i) => {
          const path = evolvePath(shootProgress, d);
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#C9A84C"
              strokeWidth="6"
              strokeDasharray={path.strokeDasharray}
              strokeDashoffset={path.strokeDashoffset}
              style={{ filter: "drop-shadow(0 0 10px rgba(201,168,76,0.8))" }}
            />
          );
        })}
      </svg>

      {/* Flash Out */}
      <AbsoluteFill style={{ backgroundColor: "#FFF", opacity: whiteFlash }} />
    </AbsoluteFill>
  );
};
