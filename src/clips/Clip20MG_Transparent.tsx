import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

const Particle = ({ delay, speed, size, x, y }: { delay: number; speed: number; size: number; x: number; y: number }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = (frame + delay) * speed;
  const currentX = (x + progress * 100) % 1200 - 100;
  
  const opacity = interpolate(
    frame,
    [0, 30, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: y,
        width: size,
        height: size,
        backgroundColor: "#C9A84C",
        borderRadius: "50%",
        opacity: opacity * (size / 10),
        boxShadow: `0 0 ${size * 2}px rgba(201, 168, 76, 0.8)`,
        filter: "blur(1px)"
      }}
    />
  );
};

export const Clip20MG_Transparent = () => {
  const { durationInFrames } = useVideoConfig();
  
  const particles = new Array(30).fill(0).map((_, i) => ({
    delay: i * 50,
    speed: 0.2 + (i % 5) * 0.1,
    size: 4 + (i % 8),
    x: (i * 137) % 1080,
    y: (i * 251) % 1920
  }));

  return (
    <AbsoluteFill>
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </AbsoluteFill>
  );
};
