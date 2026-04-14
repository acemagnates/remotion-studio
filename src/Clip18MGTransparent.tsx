import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from "remotion";

export const Clip18MGTransparent: React.FC = () => {
  const { width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const count = 15;
  const particles = new Array(count).fill(0).map((_, i) => {
    const startX = ((i * 137) % width);
    const startY = ((i * 253) % height);
    const speed = 0.5 + (i % 3) * 0.2;
    
    // ACT 1 & 3: Fade
    const entrance = interpolate(frame, [0, 45], [0, 0.6], { extrapolateRight: "clamp" });
    const exit = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
    const opacity = entrance * exit;

    const y = startY - (frame * speed);
    const wrappedY = ((y + height) % height);

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: startX,
          top: wrappedY,
          width: 4 + (i % 4),
          height: 4 + (i % 4),
          backgroundColor: "#C9A84C",
          borderRadius: "50%",
          opacity,
          boxShadow: "0 0 8px #C9A84C"
        }}
      />
    );
  });

  return (
    <AbsoluteFill>
      {particles}
    </AbsoluteFill>
  );
};
