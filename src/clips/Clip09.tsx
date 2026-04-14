import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip09: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Crack strikes + Panels slide)
  const crackProgress = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const panelsSlide = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const slideX = interpolate(panelsSlide, [0, 1], [0, 450]);

  // ACT 2: HOLD + EVOLUTION (Checkmarks flow)
  const waterfallOffset = (frame * 15) % 1920;

  // ACT 3: EXIT (Slam shut)
  const exitStart = durationInFrames - 15;
  const exitSlam = spring({
    frame: frame - exitStart,
    fps,
    config: { damping: 10, stiffness: 300, mass: 2 },
  });
  const slamX = interpolate(exitSlam, [0, 1], [0, -450]);

  const crackPath = "M 540 0 L 520 200 L 560 400 L 530 600 L 550 800 L 520 1000 L 560 1200 L 540 1400 L 570 1600 L 540 1920";
  const evolved = evolvePath(crackProgress, crackPath);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Underlying Waterfall */}
      <AbsoluteFill style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "flex-start",
        transform: `translateY(-${waterfallOffset}px)`,
        gap: 100,
      }}>
        {new Array(20).fill(0).map((_, i) => (
          <div key={i} style={{ fontSize: 120, color: "#00FF00", fontWeight: 900 }}>
            ✓
          </div>
        ))}
      </AbsoluteFill>

      {/* Panels */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "50%",
        height: "100%",
        backgroundColor: "#0A0A0A",
        transform: `translateX(${-slideX - slamX}px)`,
        borderRight: "2px solid #C9A84C",
      }} />
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "50%",
        height: "100%",
        backgroundColor: "#0A0A0A",
        transform: `translateX(${slideX + slamX}px)`,
        borderLeft: "2px solid #C9A84C",
      }} />

      {/* Crack Line */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
        <path
          d={crackPath}
          stroke="#C9A84C"
          strokeWidth="10"
          fill="none"
          strokeDasharray={evolved.strokeDasharray}
          strokeDashoffset={evolved.strokeDashoffset}
          style={{ 
            opacity: interpolate(panelsSlide, [0, 0.5], [1, 0]),
            filter: "drop-shadow(0 0 10px #C9A84C)" 
          }}
        />
      </svg>
    </AbsoluteFill>
  );
};
