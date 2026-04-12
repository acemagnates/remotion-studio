import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import React from "react";

const Tag = ({ initialX, delay, speed }: { initialX: number; delay: number; speed: number }) => {
  const frame = useCurrentFrame();
  const y = ((frame - delay) * speed) % 2000 - 200;

  if (frame < delay) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: initialX,
        top: y,
        backgroundColor: "rgba(201, 168, 76, 0.4)",
        padding: "10px 20px",
        borderRadius: 4,
        border: "1px solid #C9A84C",
        opacity: 0.6,
      }}
    >
      <span style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>$1,000</span>
    </div>
  );
};

export const MoneyWaterfall = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Central tag snap animation (starts at frame 60)
  const snapFrame = 60;
  const snapProgress = spring({
    frame: frame - snapFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const centralScale = interpolate(snapProgress, [0, 1], [0.5, 1.5]);
  const centralOpacity = interpolate(snapProgress, [0, 0.5], [0, 1]);

  // Background blur and slow down
  const focusProgress = spring({
    frame: frame - snapFrame,
    fps,
    config: { damping: 20 },
  });

  const bgBlur = interpolate(focusProgress, [0, 1], [0, 24]);
  const bgSpeedDivisor = interpolate(focusProgress, [0, 1], [1, 5]);

  const tags = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      delay: Math.random() * 100,
      speed: 10 + Math.random() * 15,
    }));
  }, [width]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Background Tags */}
      <AbsoluteFill style={{ filter: `blur(${bgBlur}px)` }}>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            initialX={tag.x}
            delay={tag.delay}
            speed={tag.speed / bgSpeedDivisor}
          />
        ))}
      </AbsoluteFill>

      {/* Central Tag */}
      {frame >= snapFrame && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: "#C9A84C",
              padding: "40px 80px",
              borderRadius: 12,
              border: "2px solid white",
              boxShadow: "0 0 50px rgba(201, 168, 76, 0.8)",
              transform: `scale(${centralScale})`,
              opacity: centralOpacity,
              zIndex: 10,
            }}
          >
            <h1 style={{ color: "white", fontSize: 100, fontWeight: 900, margin: 0 }}>
              $1,000
            </h1>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
