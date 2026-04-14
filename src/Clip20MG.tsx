import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip20MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (Crack race)
  const crackProgress = interpolate(frame, [0, 45], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  // ACT 2: EVOLUTION (Shifting plates and glow)
  const drift = interpolate(frame, [45, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
  });
  
  const textOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1.2]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });

  // Complex branching crack (simplified SVG)
  const crackPath = "M 540 960 L 540 200 M 540 960 L 540 1720 M 540 960 L 100 800 M 540 960 L 1000 1100 M 100 800 L 50 400 M 1000 1100 L 1050 1500";
  const { strokeDasharray, strokeDashoffset } = evolvePath(crackProgress, crackPath);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      {/* Revealed Text */}
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center", 
        opacity: textOpacity,
        transform: `scale(${1 + drift * 0.001})`
      }}>
        <h1 style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 90,
          color: "white",
          fontWeight: 900,
          textAlign: "center",
          letterSpacing: "8px",
          textShadow: `0 0 ${30 * glowPulse}px #C9A84C`
        }}>
          THE INVISIBLE<br/>ASSET
        </h1>
      </AbsoluteFill>

      {/* Shifting background plates (conceptual split) */}
      <div style={{
        position: "absolute",
        left: -drift,
        top: 0,
        bottom: 0,
        width: "50%",
        backgroundColor: "#0A0A0A",
        zIndex: 1,
        borderRight: "1px solid rgba(201,168,76,0.3)"
      }} />
      <div style={{
        position: "absolute",
        right: -drift,
        top: 0,
        bottom: 0,
        width: "50%",
        backgroundColor: "#0A0A0A",
        zIndex: 1,
        borderLeft: "1px solid rgba(201,168,76,0.3)"
      }} />

      {/* Crack Overlay */}
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        style={{ position: "absolute", zIndex: 2, pointerEvents: "none" }}
      >
        <path
          d={crackPath}
          stroke="#C9A84C"
          strokeWidth="4"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{ filter: "drop-shadow(0 0 10px #C9A84C)" }}
        />
      </svg>
    </AbsoluteFill>
  );
};
