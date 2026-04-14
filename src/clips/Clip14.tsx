import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { evolvePath } from "@remotion/paths";
import React from "react";

export const Clip14 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Kintsugi Fractures
  const paths = [
    "M 540 960 L 200 600 L 0 400",
    "M 540 960 L 880 1200 L 1080 1500",
    "M 540 960 L 400 1300 L 200 1920",
    "M 540 960 L 700 400 L 900 0",
    "M 540 960 L 100 1000",
    "M 540 960 L 980 900"
  ];

  const drawProgress = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  
  // ACT 2: Panels drift
  const drift = interpolate(frame, [15, 75], [0, 40], { extrapolateRight: "clamp" });
  const textScale = interpolate(frame, [15, 75], [0.8, 1.2], { extrapolateRight: "clamp" });
  const glow = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.5, 1.2]);

  // ACT 3: EXIT (Shatter to dust)
  const exitS = spring({ frame: frame - (durationInFrames - 15), fps });
  const exitOpacity = interpolate(exitS, [0, 1], [1, 0]);
  const exitScale = interpolate(exitS, [0, 1], [1, 1.5]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      {/* Revealed text beneath */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <h1 style={{
              fontFamily: "sans-serif",
              fontSize: 240,
              fontWeight: 900,
              color: "#FFF",
              letterSpacing: "0.2em",
              transform: `scale(${textScale})`,
              filter: "blur(2px)",
              opacity: interpolate(frame, [10, 30], [0, 1])
          }}>
              WRONG
          </h1>
      </AbsoluteFill>

      {/* Black Panels (Simulated by 4 large divs shifting out) */}
      <AbsoluteFill style={{ transform: `translateX(${-drift}px) translateY(${-drift}px)`, backgroundColor: "#000", clipPath: "polygon(0 0, 50% 0, 50% 50%, 0 50%)", opacity: exitOpacity }} />
      <AbsoluteFill style={{ transform: `translateX(${drift}px) translateY(${-drift}px)`, backgroundColor: "#000", clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)", opacity: exitOpacity }} />
      <AbsoluteFill style={{ transform: `translateX(${-drift}px) translateY(${drift}px)`, backgroundColor: "#000", clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)", opacity: exitOpacity }} />
      <AbsoluteFill style={{ transform: `translateX(${drift}px) translateY(${drift}px)`, backgroundColor: "#000", clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)", opacity: exitOpacity }} />

      {/* Gold Fracture Lines */}
      <svg width={width} height={height} style={{ position: "absolute", overflow: "visible", opacity: exitOpacity }}>
          {paths.map((p, i) => {
              const { strokeDasharray, strokeDashoffset } = evolvePath(drawProgress, p);
              return (
                  <path
                      key={i}
                      d={p}
                      fill="none"
                      stroke="#C9A84C"
                      strokeWidth="6"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      style={{
                          filter: `drop-shadow(0 0 ${10 * glow}px rgba(201,168,76,0.8))`
                      }}
                  />
              );
          })}
      </svg>
    </AbsoluteFill>
  );
};
