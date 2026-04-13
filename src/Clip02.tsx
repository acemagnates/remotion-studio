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

  // Vertical drift: y starts at some point and moves up.
  // Wrap around: (startPos - speed * frame) % height
  const y = (height - (speed * frame) % (height + 100)) % (height + 100) - 50;
  
  // Horizontal drift
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

export const Clip02 = () => {
  const { width } = useVideoConfig();
  
  // Three layers
  // FG: 6 particles, 5-6px, 18px/s, opacity 0.8
  // MID: 8 particles, 3-4px, 10px/s, opacity 0.5
  // BG: 6 particles, 2px, 4px/s, opacity 0.3

  const fg = new Array(6).fill(0).map((_, i) => ({
    size: 5 + Math.random() * 1,
    baseOpacity: 0.8,
    speed: 1.08, // 18px / 60fps = 0.3px/frame? No, 18px/s. 
    // Wait, speed 18px/s at 60fps is 0.3px per frame. That's very slow.
    // Let me re-read: "Foreground 18px/s". Okay.
    actualSpeed: 18 / 60,
    horizontalSpeed: (Math.random() - 0.5) * 6,
    startX: Math.random() * width
  }));

  const mid = new Array(8).fill(0).map((_, i) => ({
    size: 3 + Math.random() * 1,
    baseOpacity: 0.5,
    actualSpeed: 10 / 60,
    horizontalSpeed: (Math.random() - 0.5) * 6,
    startX: Math.random() * width
  }));

  const bg = new Array(6).fill(0).map((_, i) => ({
    size: 2,
    baseOpacity: 0.3,
    actualSpeed: 4 / 60,
    horizontalSpeed: (Math.random() - 0.5) * 6,
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
