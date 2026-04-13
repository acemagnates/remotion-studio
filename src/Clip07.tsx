import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip07 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0-0.8s)
  const path = `M ${width/2} 0 L ${width/2} ${height}`;
  const { strokeDasharray, strokeDashoffset } = evolvePath(
    interpolate(frame, [0, 42], [0, 1], { extrapolateRight: "clamp" }),
    path
  );

  const vibration = interpolate(frame, [0, 42], [0, 1], { extrapolateRight: "clamp" }) * Math.sin(frame * 5) * 1;

  // ACT 2: HOLD + EVOLUTION (0.8-2.5s)
  const panelSlide = spring({
    frame: frame - 48,
    fps,
    config: { damping: 200 }
  });
  const slideX = interpolate(panelSlide, [0, 1], [0, 12]);

  // Calendar X's
  const xCount = Math.floor(interpolate(frame, [60, 120], [0, 29], { extrapolateRight: "clamp" }));
  
  // Line Graph
  const graphPath = "M 580 1600 Q 800 1500 1000 1000";
  const { strokeDasharray: gsd, strokeDashoffset: gso } = evolvePath(
    interpolate(frame, [60, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    graphPath
  );

  const labelsOpacity = interpolate(frame, [72, 96], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const dotPulse = interpolate(
    Math.sin((frame / fps) * (Math.PI / 0.5)),
    [-1, 1],
    [1, 1.5]
  );

  // ACT 3: EXIT (2.5-3.0s)
  const exitSlide = interpolate(frame, [durationInFrames - 30, durationInFrames], [12, 0], {
    extrapolateLeft: "clamp"
  });
  const exitOpacity = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp"
  });

  const currentSlide = frame > durationInFrames - 30 ? exitSlide : slideX;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exitOpacity, fontFamily: "sans-serif" }}>
      {/* Left Panel */}
      <AbsoluteFill style={{ width: "50%", transform: `translateX(${-currentSlide + vibration}px)`, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "10%", width: "80%" }}>
          <div style={{ color: "#C9A84C", fontSize: 18, marginBottom: 20, opacity: labelsOpacity }}>EVERY DAY</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {new Array(30).fill(0).map((_, i) => (
              <div key={i} style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {i < xCount && <div style={{ color: "#FF4444", fontSize: 24 }}>X</div>}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>

      {/* Right Panel */}
      <AbsoluteFill style={{ width: "50%", left: "50%", transform: `translateX(${currentSlide + vibration}px)`, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "10%", width: "80%" }}>
          <div style={{ color: "white", fontSize: 18, marginBottom: 20, opacity: labelsOpacity }}>THE RESULT</div>
        </div>
        <svg width={width} height={height} style={{ position: "absolute", top: 0, left: -width/2 }}>
          <path d={graphPath} fill="none" stroke="#C9A84C" strokeWidth="3" strokeDasharray={gsd} strokeDashoffset={gso} />
          {frame > 150 && (
            <circle cx="1000" cy="1000" r={4 * dotPulse} fill="#C9A84C" style={{ filter: "drop-shadow(0 0 8px rgba(201,168,76,0.8))" }} />
          )}
        </svg>
      </AbsoluteFill>

      {/* Center Fracture */}
      <svg width={width} height={height} style={{ position: "absolute", pointerEvents: "none" }}>
        <path d={path} fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
      </svg>
    </AbsoluteFill>
  );
};
