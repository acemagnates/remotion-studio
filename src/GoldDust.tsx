import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

const DustParticle = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => {
  const frame = useCurrentFrame();
  const driftY = ((frame + delay) * 0.5) % 2000;
  const driftX = Math.sin((frame + delay) * 0.01) * 50;

  return (
    <div
      style={{
        position: "absolute",
        left: x + driftX,
        bottom: driftY,
        width: size,
        height: size,
        backgroundColor: "#C9A84C",
        borderRadius: "50%",
        opacity: 0.4,
        boxShadow: "0 0 10px #C9A84C",
      }}
    />
  );
};

export const GoldDust = () => {
  const { width, height } = useVideoConfig();

  const particles = React.useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 1000,
    }));
  }, [width, height]);

  return (
    <AbsoluteFill>
      {particles.map((p) => (
        <DustParticle key={p.id} {...p} />
      ))}
    </AbsoluteFill>
  );
};
