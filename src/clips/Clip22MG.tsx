import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

const CROWN_PATH = "M 540 800 L 400 950 L 450 1100 L 630 1100 L 680 950 Z M 400 950 L 300 850 L 450 850 M 680 950 L 780 850 L 630 850";
// Slightly more robust crown icon surrogate
const ROBUST_CROWN = "M 340 1000 L 340 1100 L 740 1100 L 740 1000 L 840 800 L 640 900 L 540 700 L 440 900 L 240 800 Z";

export const Clip22MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const drawProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  const path = evolvePath(drawProgress, ROBUST_CROWN);

  const textSlam = spring({
    frame: frame - 25,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const textY = interpolate(textSlam, [0, 1], [200, 0]);
  const textOpacity = interpolate(textSlam, [0, 0.5], [0, 1]);

  // ACT 2: HOLD + EVOLUTION
  const drift = interpolate(frame, [0, durationInFrames], [0, -50]);
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.03]);
  const shimmer = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.5, 1]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clmap" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center", opacity: exit }}>
      <div style={{ transform: `translateY(${drift}px) scale(${scale})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Crown SVG */}
        <svg viewBox="0 0 1080 1920" style={{ width: 400, height: 400, marginBottom: 50 }}>
          <path
            d={ROBUST_CROWN}
            fill="none"
            stroke="#C9A84C"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={path.strokeDasharray}
            strokeDashoffset={path.strokeDashoffset}
            style={{ filter: `drop-shadow(0 0 15px rgba(201, 168, 76, ${shimmer}))` }}
          />
        </svg>

        {/* Text */}
        <div style={{ transform: `translateY(${textY}px)`, opacity: textOpacity }}>
          <h1 style={{ fontFamily: "Impact, sans-serif", fontSize: 100, color: "#FFFFFF", margin: 0, letterSpacing: 8 }}>
            IRREPLACEABLE
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};
