import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import React from "react";

export const AudienceCustomer = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Audience Phase (0-30 frames)
  const audienceSlide = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const audienceX = interpolate(audienceSlide, [0, 1], [-500, 0]);
  const audienceOpacity = interpolate(frame, [30, 40], [1, 0], { extrapolateLeft: "clamp" });

  // Customer Phase (starts at frame 45)
  const customerSlam = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const customerScale = interpolate(customerSlam, [0, 1], [4, 1], {
    extrapolateRight: "clamp",
  });
  const customerOpacity = interpolate(frame, [45, 50], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      {/* Audience Text */}
      <div
        style={{
          position: "absolute",
          transform: `translateX(${audienceX}px)`,
          opacity: audienceOpacity,
          color: "white",
          fontSize: 120,
          fontWeight: "100",
          fontFamily: "Inter, sans-serif",
          letterSpacing: 10,
        }}
      >
        AUDIENCE
      </div>

      {/* Customer Text */}
      <div
        style={{
          position: "absolute",
          transform: `scale(${customerScale})`,
          opacity: customerOpacity,
          color: "#C9A84C",
          fontSize: 160,
          fontWeight: "900",
          fontFamily: "Inter, sans-serif",
          textShadow: "0 0 40px #C9A84C",
        }}
      >
        CUSTOMER
      </div>
    </AbsoluteFill>
  );
};
