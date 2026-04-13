import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const SEED = 42;
const random = (i: number) => {
  const x = Math.sin(SEED + i) * 10000;
  return x - Math.floor(x);
};

export const Clip05 = ({ count = 18, centerWeighted = false, upperHalfOnly = false, brightness = 1 }: { count?: number, centerWeighted?: boolean, upperHalfOnly?: boolean, brightness?: number }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  // ACT 1 & 3: FADE
  const entrance = interpolate(frame, [0, 9], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [durationInFrames - 9, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const particles = new Array(count).fill(0).map((_, i) => {
    const size = 2 + random(i * 3) * 3;
    const opacity = (0.3 + random(i * 7) * 0.4) * brightness;
    const speed = size * 0.5; // faster for larger
    
    let startX = random(i * 11) * width;
    let startY = random(i * 13) * height;

    if (centerWeighted) {
        startX = width * 0.5 + (random(i * 11) - 0.5) * width * 0.4;
        startY = height * 0.5 + (random(i * 13) - 0.5) * height * 0.4;
    }

    if (upperHalfOnly) {
        startY = random(i * 13) * height * 0.5;
    }

    const driftY = -frame * speed * 0.4;
    const driftX = Math.sin(frame * 0.05 + i) * 10;

    return (
      <div key={i} style={{
        position: "absolute",
        left: startX + driftX,
        top: startY + driftY,
        width: size,
        height: size,
        backgroundColor: "#C9A84C",
        borderRadius: "50%",
        opacity: opacity * entrance * exit
      }} />
    );
  });

  return (
    <AbsoluteFill>
      {particles}
    </AbsoluteFill>
  );
};
