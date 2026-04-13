import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip02 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const axisPath = `M ${width * 0.1} ${height * 0.8} L ${width * 0.9} ${height * 0.8}`;
  const axisProgress = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const { strokeDasharray, strokeDashoffset } = evolvePath(axisProgress, axisPath);

  const titleFade = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });

  const beforeSpring = spring({ frame, fps, config: { damping: 200 } });
  const beforeHeight = interpolate(beforeSpring, [0, 1], [0, height * 0.25]);

  // ACT 2: HOLD + EVOLUTION
  const afterSpring = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const afterHeight = interpolate(afterSpring, [0, 1], [0, height * 0.5]);

  const calloutSpring = spring({ frame, fps, delay: 45, config: { damping: 12, stiffness: 200 } });
  const calloutBloom = "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)";

  const drift = interpolate(frame, [0, durationInFrames], [1, 1.03]);
  const shimmerPos = interpolate(frame, [45, 90], [100, -100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      {/* Title */}
      <div style={{
        position: "absolute",
        top: "10%",
        width: "100%",
        textAlign: "center",
        color: "#FFF",
        fontFamily: "Inter, sans-serif",
        fontSize: 32,
        letterSpacing: "0.5em",
        opacity: titleFade,
        fontWeight: 400
      }}>
        OUTPUT
      </div>

      {/* Axis Line */}
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path 
            d={axisPath} 
            stroke="#C9A84C" 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* BEFORE Bar */}
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "25%",
        width: 140 * drift,
        height: beforeHeight,
        backgroundColor: "#3A3A3A",
        transform: "translateX(-50%)"
      }} />
      <div style={{
        position: "absolute",
        bottom: "17%",
        left: "25%",
        width: "20%",
        textAlign: "center",
        color: "#C9A84C",
        fontFamily: "Inter, sans-serif",
        fontSize: 24,
        letterSpacing: "0.2em",
        transform: "translateX(-50%)",
        opacity: beforeSpring
      }}>
        BEFORE
      </div>

      {/* AFTER Bar */}
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "75%",
        width: 140 * drift,
        height: afterHeight,
        backgroundColor: "#C9A84C",
        transform: "translateX(-50%)",
        overflow: "hidden"
      }}>
        {/* Shimmer */}
        <div style={{
            position: "absolute",
            width: "100%",
            height: "40%",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)",
            top: `${shimmerPos}%`
        }} />
      </div>
      <div style={{
        position: "absolute",
        bottom: "17%",
        left: "75%",
        width: "20%",
        textAlign: "center",
        color: "#C9A84C",
        fontFamily: "Inter, sans-serif",
        fontSize: 24,
        letterSpacing: "0.2em",
        transform: "translateX(-50%)",
        opacity: afterSpring
      }}>
        AFTER
      </div>

      {/* 2x Callout */}
      <div style={{
        position: "absolute",
        bottom: `calc(20% + ${afterHeight}px + 40px)`,
        left: "75%",
        transform: `translateX(-50%) scale(${calloutSpring})`,
        color: "#FFF",
        fontFamily: "Inter, sans-serif",
        fontSize: 120,
        fontWeight: 900,
        textShadow: calloutBloom,
        opacity: calloutSpring
      }}>
        2x
      </div>
    </AbsoluteFill>
  );
};
