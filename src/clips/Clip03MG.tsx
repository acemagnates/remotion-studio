import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

const KINTSUGI_PATH = "M 540 0 L 520 100 L 560 250 L 530 400 L 550 600 L 540 850 L 560 1100 L 530 1350 L 545 1600 L 540 1920";

export const Clip03MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const drawProgress = spring({
    frame,
    fps,
    config: { damping: 20 },
    durationInFrames: 15,
  });

  const path = evolvePath(drawProgress, KINTSUGI_PATH);

  const splitSlam = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const panelOffset = interpolate(splitSlam, [0, 1], [0, 400]);

  // ACT 2: HOLD + EVOLUTION
  const pulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.8, 1]
  );
  const microDrift = interpolate(frame, [0, durationInFrames], [0, 50]);

  // ACT 3: EXIT
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp" }
  );
  const dropZ = interpolate(exit, [0, 1], [0, 1000]);
  const fade = interpolate(exit, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", perspective: 1000, overflow: "hidden" }}>
      {/* Left Panel */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          transform: `translateX(${-panelOffset - microDrift}px) translateZ(${-dropZ}px)`,
          opacity: fade,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRight: "2px solid #C9A84C",
          boxShadow: `0 0 20px rgba(201, 168, 76, ${pulse * 0.5})`,
          zIndex: 2,
        }}
      >
        <div style={{ padding: "20px 40px", backgroundColor: "#FF0000", color: "#FFF", fontSize: 60, fontWeight: 900 }}>
          TERMINATED
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          transform: `translateX(${panelOffset + microDrift}px) translateZ(${-dropZ}px)`,
          opacity: fade,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderLeft: "2px solid #C9A84C",
          boxShadow: `0 0 20px rgba(201, 168, 76, ${pulse * 0.5})`,
          zIndex: 2,
        }}
      >
        {/* Simple grey cubicle grid icon surrogate */}
        <div style={{ width: 200, height: 200, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {new Array(9).fill(0).map((_, i) => (
            <div key={i} style={{ backgroundColor: "#555", borderRadius: 4 }} />
          ))}
        </div>
      </div>

      {/* Fracture Line (Only visible before/during split) */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          pointerEvents: "none",
          opacity: interpolate(splitSlam, [0, 0.5], [1, 0]),
        }}
      >
        <path
          d={KINTSUGI_PATH}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="8"
          strokeDasharray={path.strokeDasharray}
          strokeDashoffset={path.strokeDashoffset}
          style={{
            filter: "drop-shadow(0 0 8px rgba(201, 168, 76, 0.8))",
          }}
        />
      </svg>
    </AbsoluteFill>
  );
};
