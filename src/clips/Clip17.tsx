import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { useMemo } from "react";

export const Clip17: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const particles = useMemo(() => {
    return new Array(20).fill(0).map((_, i) => ({
      x: Math.random() * 1080,
      y: Math.random() * 1920,
      size: Math.random() * 8 + 4,
      speedX: Math.random() * 1 + 0.5,
      speedY: Math.random() * -1 - 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  const opacity = interpolate(frame, [0, 30, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      {particles.map((p, i) => {
        const driftX = frame * p.speedX;
        const driftY = frame * p.speedY;
        
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              backgroundColor: "#C9A84C",
              borderRadius: "50%",
              opacity: p.opacity,
              boxShadow: "0 0 10px rgba(201, 168, 76, 0.8)",
              transform: `translate(${p.x + driftX}px, ${p.y + driftY}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
