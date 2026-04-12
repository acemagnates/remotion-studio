import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React from "react";

const Bar = ({ index, total, height: barHeight }: { index: number; total: number; height: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 5;
  const growth = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  return (
    <div
      style={{
        flex: 1,
        height: `${growth * barHeight}%`,
        backgroundColor: "white",
        border: "1px solid #C9A84C",
        boxShadow: "0 0 15px rgba(201, 168, 76, 0.4)",
        margin: "0 8px",
        borderRadius: "4px 4px 0 0",
        alignSelf: "flex-end",
      }}
    />
  );
};

export const ClassifiedTerminal = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const cameraScale = interpolate(frame, [0, 150], [1, 1.15]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Smoked Obsidian Plate with Blur */}
      <AbsoluteFill
        style={{
          background: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(24px)",
          margin: 40,
          border: "1px solid rgba(201, 168, 76, 0.2)",
          borderRadius: 20,
        }}
      />

      {/* Bar Chart Container */}
      <div
        style={{
          width: "80%",
          height: "60%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          transform: `scale(${cameraScale})`,
        }}
      >
        {[60, 85, 45, 95, 70, 80].map((h, i) => (
          <Bar key={i} index={i} total={6} height={h} />
        ))}
      </div>

      {/* UI Accents */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          color: "#C9A84C",
          fontFamily: "monospace",
          fontSize: 24,
          opacity: 0.6,
        }}
      >
        TERMINAL STATUS: ACTIVE
        <br />
        ENCRYPTION: AES-256
      </div>
    </AbsoluteFill>
  );
};
