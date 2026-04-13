import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip08 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0-0.7s)
  const axisPath = "M 200 1600 L 880 1600";
  const { strokeDasharray, strokeDashoffset } = evolvePath(
    interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" }),
    axisPath
  );

  const label1 = "QUALITY (sporadic)";
  const label2 = "CONSISTENCY";
  
  const label1Length = Math.floor(interpolate(frame, [10, 30], [0, label1.length], { extrapolateRight: "clamp" }));
  const label2Length = Math.floor(interpolate(frame, [15, 35], [0, label2.length], { extrapolateRight: "clamp" }));

  // ACT 2: HOLD + EVOLUTION (0.7-3.0s)
  const bar1Grow = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 }
  });
  const bar2Grow = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 }
  });

  const bar1Height = interpolate(bar1Grow, [0, 1], [0, 150]);
  const bar2Height = interpolate(bar2Grow, [0, 1], [0, 700]);

  const bothSlide = spring({
    frame: frame - 108, // 1.8s
    fps,
    config: { damping: 200 }
  });
  const bothX = interpolate(bothSlide, [0, 1], [200, 0]);

  const shimmer = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.8, 1]
  );

  // ACT 3: EXIT (3.0-3.5s)
  const exit = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp"
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit, fontFamily: "monospace", color: "white" }}>
      {/* Axis */}
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path d={axisPath} fill="none" stroke="#C9A84C" strokeWidth="2" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
      </svg>

      {/* Bar 1 */}
      <div style={{
        position: "absolute",
        bottom: 320,
        left: 300,
        width: 100,
        height: bar1Height,
        backgroundColor: "#444444",
        opacity: shimmer,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center"
      }}>
        <div style={{ position: "absolute", bottom: -60, color: "#888888", fontSize: 16, textAlign: "center", width: 150 }}>
          {label1.substring(0, label1Length)}
        </div>
      </div>

      {/* Bar 2 */}
      <div style={{
        position: "absolute",
        bottom: 320,
        left: 600,
        width: 100,
        height: bar2Height,
        backgroundColor: "#C9A84C",
        opacity: shimmer,
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center"
      }}>
        <div style={{ position: "absolute", bottom: -60, color: "white", fontSize: 18, textAlign: "center", width: 150 }}>
          {label2.substring(0, label2Length)}
        </div>
        
        {/* Callout */}
        {frame > 108 && (
          <div style={{
            position: "absolute",
            top: -50,
            right: -100,
            color: "#C9A84C",
            fontSize: 24,
            fontWeight: "bold",
            transform: `translateX(${bothX}px)`,
            opacity: bothSlide,
            textShadow: "0 0 8px rgba(201,168,76,0.6)"
          }}>
            BOTH ↑
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
