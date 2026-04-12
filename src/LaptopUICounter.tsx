import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React from "react";

export const LaptopUICounter = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fillProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const snapSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const counterScale = interpolate(snapSpring, [0, 1], [0.8, 1]);
  const lockedOpacity = interpolate(frame, [70, 90], [0, 1]);
  
  const driftY = Math.sin(frame * 0.05) * 10;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `translateY(${driftY}px)`, textAlign: "center" }}>
        <div
          style={{
            fontSize: 120,
            color: "white",
            fontWeight: "bold",
            transform: `scale(${counterScale})`,
            fontFamily: "Inter, sans-serif",
          }}
        >
          500 / 500
        </div>
        
        {/* Status Bar */}
        <div
          style={{
            width: 400,
            height: 10,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            margin: "20px auto",
            position: "relative",
            overflow: "hidden",
            borderRadius: 5,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${fillProgress * 100}%`,
              backgroundColor: "#C9A84C",
              boxShadow: "0 0 10px #C9A84C",
            }}
          />
        </div>

        <div
          style={{
            color: "#C9A84C",
            fontSize: 60,
            fontWeight: "900",
            letterSpacing: 10,
            opacity: lockedOpacity,
            WebkitTextStroke: "1px #C9A84C",
          }}
        >
          LOCKED
        </div>
      </div>
    </AbsoluteFill>
  );
};
