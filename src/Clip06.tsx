import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip06 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0-1.0s)
  const path1 = "M 200 400 L 880 1520";
  const path2 = "M 540 960 L 980 960";
  
  const { strokeDasharray: sd1, strokeDashoffset: so1 } = evolvePath(
    interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp", easing: Easing.bezier(0.4, 0, 0.2, 1) }),
    path1
  );
  const { strokeDasharray: sd2, strokeDashoffset: so2 } = evolvePath(
    interpolate(frame, [36, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    path2
  );

  // ACT 2: HOLD + EVOLUTION (1.0-2.5s)
  const shift = interpolate(frame, [60, 108], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const goldLightOpacity = interpolate(frame, [60, 108], [0.3, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const textOpacity = interpolate(frame, [72, 96], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const textScale = interpolate(frame, [72, 150], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const pulse = interpolate(
    Math.sin((frame / fps) * (Math.PI / 0.35)), // 0.7s cycle
    [-1, 1],
    [0.6, 1]
  );

  // ACT 3: EXIT (2.5-3.0s)
  const exit = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp"
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      {/* Gold Light Bleed */}
      <AbsoluteFill style={{
        background: `radial-gradient(circle at 50% 50%, rgba(201, 168, 76, ${goldLightOpacity}) 0%, rgba(0,0,0,0) 70%)`,
        opacity: goldLightOpacity,
        mixBlendMode: "screen"
      }} />

      {/* Panels Shifting */}
      <AbsoluteFill style={{ transform: `translateX(${-shift}px) translateY(${-shift}px)` }}>
        {/* Top/Left panel color placeholder */}
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `translateX(${shift}px) translateY(${shift}px)` }}>
        {/* Bottom/Right panel color placeholder */}
      </AbsoluteFill>

      {/* Fractures */}
      <svg width={width} height={height} style={{ position: "absolute", filter: "drop-shadow(0 0 4px rgba(201,168,76,0.6))" }}>
        <path d={path1} fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray={sd1} strokeDashoffset={so1} opacity={pulse} />
        <path d={path2} fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray={sd2} strokeDashoffset={so2} opacity={pulse} />
      </svg>

      {/* Text */}
      <AbsoluteFill style={{ 
        justifyContent: "center", 
        alignItems: "center", 
        textAlign: "center",
        fontFamily: "sans-serif",
        color: "white",
        fontSize: 32,
        fontWeight: 900,
        opacity: textOpacity,
        transform: `scale(${textScale})`,
        textShadow: "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)"
      }}>
        GREW BECAUSE <br /> OF IT.
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
