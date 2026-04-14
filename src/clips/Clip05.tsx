import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import React from "react";

export const Clip05 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const lineEntrance = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const textEntranceValue = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 150 } });
  
  const lineH = interpolate(lineEntrance, [0, 1], [0, 180]);
  const textX = interpolate(textEntranceValue, [0, 1], [-20, 20]);
  const textOpacity = interpolate(textEntranceValue, [0, 1], [0, 1]);

  // ACT 2: HOLD + EVOLUTION
  const driftY = interpolate(frame, [0, durationInFrames], [0, -50]);
  const bgRotation = interpolate(frame, [0, durationInFrames], [0, 90]);

  // ACT 3: EXIT
  const exitProgress = spring({ frame: frame - (durationInFrames - 15), fps });
  const exitY = interpolate(exitProgress, [0, 1], [0, 100]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
        {/* Smoked glass background rotation */}
        <AbsoluteFill style={{
            background: "radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)",
            transform: `rotate(${bgRotation}deg)`,
            opacity: 0.5
        }} />

        <AbsoluteFill style={{ 
            justifyContent: "center", 
            alignItems: "flex-start", 
            paddingLeft: "15%",
            transform: `translateY(${700 + driftY + exitY}px)`,
            opacity: exitOpacity
        }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* Glowing Gold Line */}
                <div style={{
                    width: 4,
                    height: lineH,
                    backgroundColor: "#C9A84C",
                    boxShadow: "0 0 15px #C9A84C",
                    borderRadius: 2
                }} />

                {/* Text slides out from behind mask */}
                <div style={{ 
                    overflow: "hidden", 
                    marginLeft: 20,
                    height: 180,
                    display: "flex",
                    alignItems: "center"
                }}>
                    <div style={{
                        fontFamily: "sans-serif",
                        fontSize: 84,
                        fontWeight: 900,
                        color: "#FFF",
                        letterSpacing: "0.05em",
                        transform: `translateX(${textX}px)`,
                        opacity: textOpacity,
                        textTransform: "uppercase"
                    }}>
                        The 15th Call
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    </AbsoluteFill>
  );
};
