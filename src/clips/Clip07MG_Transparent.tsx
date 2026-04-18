import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React from "react";

export const Clip07MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1 — ENTRANCE (0.5s = 15 frames)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const lineScale = entrance;
  const textSlide = interpolate(entrance, [0, 1], [-100, 0]);

  // ACT 2 — HOLD + EVOLUTION (1.5s = 45 frames)
  const floatUp = interpolate(frame, [0, durationInFrames], [0, -5]);
  const linePulse = interpolate(
    Math.sin((frame / fps) * 4),
    [-1, 1],
    [0.8, 1.2]
  );

  // ACT 3 — EXIT (0.5s = 15 frames)
  const exitStart = durationInFrames - 15;
  const exitSlide = interpolate(frame, [exitStart, durationInFrames], [0, -150]);
  const lineRetract = interpolate(frame, [exitStart, durationInFrames], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "15%",
        display: "flex",
        alignItems: "center",
        transform: `translateY(${floatUp}px)`
      }}>
        {/* Vertical Gold Accent Line */}
        <div style={{
          width: 6,
          height: 120 * (frame >= exitStart ? lineRetract : lineScale),
          backgroundColor: "#C9A84C",
          boxShadow: `0 0 ${15 * linePulse}px #C9A84C`,
          borderRadius: 3
        }} />

        {/* Text Container with Mask */}
        <div style={{
          marginLeft: 25,
          overflow: "hidden",
          padding: "10px 0"
        }}>
          <div style={{
            transform: `translateX(${(frame >= exitStart ? exitSlide : textSlide)}px)`,
            backgroundColor: "rgba(10, 10, 10, 0.7)",
            padding: "10px 30px",
            borderLeft: "2px solid rgba(201, 168, 76, 0.3)"
          }}>
            <h2 style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 48,
              fontWeight: 900,
              color: "white",
              margin: 0,
              letterSpacing: "0.1em"
            }}>
              PERCY SPENCER
            </h2>
            <p style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 32,
              fontWeight: 400,
              color: "#C9A84C",
              margin: 0,
              letterSpacing: "0.2em"
            }}>
              1945
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
