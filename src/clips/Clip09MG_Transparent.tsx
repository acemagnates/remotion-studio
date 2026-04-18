import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React from "react";

export const Clip09MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1 — ENTRANCE (0.5s = 15 frames)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  });
  const cardY = interpolate(entrance, [0, 1], [1200, 0]);

  // ACT 2 — HOLD + EVOLUTION (1.5s = 45 frames)
  const text = "RAYTHEON: DEFENSE CONTRACTOR";
  const typeProgress = interpolate(frame - 15, [0, 30], [0, text.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const displayedText = text.substring(0, Math.floor(typeProgress));
  const cursor = Math.floor(frame / 5) % 2 === 0 ? "█" : "";
  
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.03]);

  // ACT 3 — EXIT (0.5s = 15 frames)
  const exitStart = durationInFrames - 15;
  const exitY = interpolate(frame, [exitStart, durationInFrames], [0, 1200], {
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{
          width: 800,
          height: 500,
          background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
          border: "2px solid #C9A84C",
          borderRadius: 8,
          boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
          transform: `translateY(${frame >= exitStart ? exitY : cardY}px) scale(${scale})`,
          display: "flex",
          flexDirection: "column",
          padding: 60,
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Evidence Stamp aesthetic */}
          <div style={{
            position: "absolute",
            top: 20,
            right: 20,
            border: "2px solid #C9A84C",
            color: "#C9A84C",
            padding: "5px 10px",
            fontSize: 18,
            fontWeight: "bold",
            transform: "rotate(15deg)",
            opacity: 0.6
          }}>
            CLASSIFIED
          </div>

          <p style={{
            fontFamily: "Courier New, monospace",
            fontSize: 36,
            color: "white",
            margin: 0,
            lineHeight: 1.4,
            textShadow: "0 0 10px rgba(255,255,255,0.2)"
          }}>
            {displayedText}{displayedText.length < text.length ? cursor : ""}
          </p>

          <div style={{ marginTop: "auto", borderTop: "1px solid rgba(201,168,76,0.3)", paddingTop: 20 }}>
            <p style={{ fontFamily: "Courier New, monospace", color: "#C9A84C", fontSize: 14 }}>
              CASE ID: AC-77492-B<br/>
              LOCATION: UNDISCLOSED
            </p>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
