import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const Particle = ({ size, baseOpacity, speed, horizontalSpeed, startX }: { 
  size: number; 
  baseOpacity: number; 
  speed: number; 
  horizontalSpeed: number;
  startX: number;
}) => {
  const frame = useCurrentFrame();
  const { height, width, durationInFrames } = useVideoConfig();

  const y = (height - (speed * frame) % (height + 100)) % (height + 100) - 50;
  const x = startX + Math.sin(frame * 0.05) * horizontalSpeed;

  const entrance = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  
  const opacity = entrance * exit * baseOpacity;

  return (
    <div style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: "#C9A84C",
      transform: `translate(${x}px, ${y}px)`,
      opacity: opacity,
    }} />
  );
};

export const Clip11 = () => {
  const { width } = useVideoConfig();
  
  const fg = new Array(8).fill(0).map((_, i) => ({
    size: 6 + Math.random() * 2,
    baseOpacity: 0.9,
    actualSpeed: 22 / 60,
    horizontalSpeed: (Math.random() - 0.5) * 8,
    startX: Math.random() * width
  }));

  const mid = new Array(10).fill(0).map((_, i) => ({
    size: 4 + Math.random() * 1,
    baseOpacity: 0.6,
    actualSpeed: 12 / 60,
    horizontalSpeed: (Math.random() - 0.5) * 6,
    startX: Math.random() * width
  }));

  const bg = new Array(7).fill(0).map((_, i) => ({
    size: 3,
    baseOpacity: 0.35,
    actualSpeed: 5 / 60,
    horizontalSpeed: (Math.random() - 0.5) * 4,
    startX: Math.random() * width
  }));

  return (
    <AbsoluteFill>
      {bg.map((p, i) => <Particle key={`bg-${i}`} size={p.size} baseOpacity={p.baseOpacity} speed={p.actualSpeed} horizontalSpeed={p.horizontalSpeed} startX={p.startX} />)}
      {mid.map((p, i) => <Particle key={`mid-${i}`} size={p.size} baseOpacity={p.baseOpacity} speed={p.actualSpeed} horizontalSpeed={p.horizontalSpeed} startX={p.startX} />)}
      {fg.map((p, i) => <Particle key={`fg-${i}`} size={p.size} baseOpacity={p.baseOpacity} speed={p.actualSpeed} horizontalSpeed={p.horizontalSpeed} startX={p.startX} />)}
    </AbsoluteFill>
  );
};
