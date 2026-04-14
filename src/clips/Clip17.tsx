import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React from "react";

export const Clip17 = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Type on A then I)
  const fullText = "AI";
  const typeProgress = interpolate(frame, [10, 25], [0, 2], { extrapolateRight: "clamp" });
  const currentText = fullText.substring(0, Math.floor(typeProgress));

  // ACT 2: HOLD + EVOLUTION (Scale up + blinking cursor)
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.15]);
  const driftY = interpolate(frame, [0, durationInFrames], [0, -20]);
  const cursorBlink = frame % 10 < 5;

  // ACT 3: EXIT (Heavy blur)
  const exitProgress = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 1], { extrapolateLeft: "clamp" });
  const blur = interpolate(exitProgress, [0, 1], [0, 100]);
  const opacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity }}>
        <AbsoluteFill style={{ 
            justifyContent: "center", 
            alignItems: "center",
            transform: `scale(${scale}) translateY(${driftY}px)`,
            filter: `blur(${blur}px)`
        }}>
            <div style={{
                fontFamily: "monospace",
                fontSize: 500,
                fontWeight: 900,
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                textShadow: "0 0 50px rgba(255,255,255,0.3)"
            }}>
                {currentText}
                <div style={{
                    width: 200,
                    height: 480,
                    backgroundColor: "#FFF",
                    marginLeft: 20,
                    opacity: cursorBlink ? 1 : 0
                }} />
            </div>
        </AbsoluteFill>
    </AbsoluteFill>
  );
};
