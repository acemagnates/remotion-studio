import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React from "react";

export const ArchitectOverlay = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 1. Line Crawl Animation (0s to 0.8s)
  const lineCrawl = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // 2. Text Slide Up Animation (starts at 0.5s)
  const textEntrance = spring({
    frame: frame - 30, // 0.5s at 60fps
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const textY = interpolate(textEntrance, [0, 1], [150, 0]);
  const textOpacity = interpolate(textEntrance, [0, 0.5], [0, 1]);

  // 3. Line Pulse (starts at 0.8s when text settles)
  const pulse = interpolate(
    frame,
    [45, 50, 60],
    [1, 1.5, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
      <div
        style={{
          position: "absolute",
          bottom: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Text Container with hidden overflow to reveal from behind line */}
        <div
          style={{
            height: 150,
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: 120,
              fontWeight: "900",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.1em",
              margin: 0,
              transform: `translateY(${textY}px)`,
              opacity: textOpacity,
              textShadow: "0 0 20px rgba(0,0,0,0.5)",
            }}
          >
            THE ARCHITECT
          </h1>
        </div>

        {/* Gold Kintsugi-style Line */}
        <div
          style={{
            width: `${lineCrawl * 800}px`,
            height: 6,
            backgroundColor: "#C9A84C",
            boxShadow: `0 0 ${pulse * 15}px #C9A84C`,
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle texture/jaggedness simulation */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: "linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2) 50%)",
              backgroundSize: "10px 100%",
              opacity: 0.3,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
