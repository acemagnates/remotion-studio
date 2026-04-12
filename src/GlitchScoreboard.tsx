import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, random } from "remotion";
import React from "react";

export const GlitchScoreboard = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const shatterFrame = 120; // 2s mark
  const isShattered = frame >= shatterFrame;

  const lieSlam = spring({
    frame: frame - shatterFrame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const lieScale = interpolate(lieSlam, [0, 1], [0.1, 1.5]);
  const lieOpacity = interpolate(frame, [shatterFrame, shatterFrame + 5], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", overflow: "hidden" }}>
      {/* Glitching Dashboard background */}
      {!isShattered ? (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                style={{
                  fontSize: 80,
                  color: "white",
                  fontFamily: "monospace",
                  opacity: random(frame + i) > 0.8 ? 0.3 : 1,
                }}
              >
                {Math.floor(random(frame + i) * 9999)}
              </div>
            ))}
          </div>
        </AbsoluteFill>
      ) : (
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
           {/* Shards of the scoreboard could be added here, but the description emphasizes the "LIE" slam */}
        </div>
      )}

      {/* Slamming "LIE" */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            color: "white",
            fontSize: 300,
            fontWeight: "900",
            fontFamily: "Inter, sans-serif",
            transform: `scale(${lieScale})`,
            opacity: lieOpacity,
            textShadow: "0 0 50px rgba(255, 255, 255, 0.5)",
          }}
        >
          LIE
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
