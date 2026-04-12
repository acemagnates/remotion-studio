import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import React, { useMemo } from "react";

const DriftingParticle = ({ x, y, delay, freezeRange }: { x: number; y: number; delay: number; freezeRange: [number, number] }) => {
  const frame = useCurrentFrame();
  
  const [freezeStart, freezeEnd] = freezeRange;
  
  let effectiveFrame = frame;
  if (frame > freezeStart && frame <= freezeEnd) {
    effectiveFrame = freezeStart;
  } else if (frame > freezeEnd) {
    effectiveFrame = frame - (freezeEnd - freezeStart);
  }

  const animFrame = effectiveFrame + delay;
  const currentX = x - animFrame * 0.5;
  const currentY = y - animFrame * 1.5;

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        width: 12,
        height: 12,
        backgroundColor: "#C9A84C",
        borderRadius: "50%",
        filter: "blur(12px)",
        opacity: 0.6,
      }}
    />
  );
};

export const AtmosphericParticles = () => {
  const { width, height } = useVideoConfig();
  
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height + 200,
      delay: Math.random() * 500,
    }));
  }, [width, height]);

  return (
    <AbsoluteFill>
      {particles.map((p, i) => (
        <DriftingParticle 
          key={i} 
          {...p} 
          freezeRange={[120, 180]} // 1s freeze at 60fps
        />
      ))}
    </AbsoluteFill>
  );
};
