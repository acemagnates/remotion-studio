import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip13 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (0-0.7s)
  const path = `M ${width/2 - 100} ${height/2} L ${width/2 + 100} ${height/2} M ${width/2} ${height/2 - 50} L ${width/2} ${height/2 + 50}`;
  const { strokeDasharray, strokeDashoffset } = evolvePath(
    interpolate(frame, [0, 36], [0, 1], { extrapolateRight: "clamp" }),
    path
  );

  const shift = interpolate(frame, [0, 36], [0, 3], { extrapolateRight: "clamp" });

  // ACT 2: HOLD + EVOLUTION (0.7-2.0s)
  const nameOpacity = interpolate(frame, [42, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const separatorWidth = interpolate(frame, [60, 84], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const handleOpacity = interpolate(frame, [72, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [90, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const scale = interpolate(frame, [42, 120], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", fontFamily: "sans-serif", color: "white" }}>
      {/* Fracture */}
      <svg width={width} height={height} style={{ position: "absolute", filter: "drop-shadow(0 0 4px rgba(201,168,76,0.6))" }}>
        <path d={path} fill="none" stroke="#C9A84C" strokeWidth="2" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
      </svg>

      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center", 
        textAlign: "center",
        transform: `scale(${scale})`
      }}>
        <div style={{ transform: `translateY(${-shift}px)`, opacity: nameOpacity }}>
          <div style={{ fontSize: 36, fontWeight: 900, textShadow: "0 0 12px rgba(201,168,76,0.5)" }}>ACE MAGNATES</div>
        </div>

        {/* Separator */}
        <div style={{ 
          width: separatorWidth, 
          height: 1, 
          backgroundColor: "#C9A84C", 
          margin: "15px 0",
          opacity: nameOpacity
        }} />

        <div style={{ transform: `translateY(${shift}px)` }}>
          <div style={{ color: "#C9A84C", fontSize: 16, letterSpacing: "0.2em", opacity: handleOpacity }}>@acemagnates</div>
          <div style={{ fontSize: 12, marginTop: 10, opacity: taglineOpacity, letterSpacing: "0.1em" }}>MORE STORIES THEY DON'T TEACH</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
