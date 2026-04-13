import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const SHARD_COUNT = 14;
const random = (i: number) => {
  const x = Math.sin(1337 + i) * 10000;
  return x - Math.floor(x);
};

export const Clip13 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Shard trajectories
  const burst = interpolate(frame, [0, 24], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp)
  });

  const textSpring = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const textScale = interpolate(frame, [0, durationInFrames], [1, 1.06]);

  const bloomGlow = "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)";
  const edgePulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 9, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  const shards = new Array(SHARD_COUNT).fill(0).map((_, i) => {
    const angle = (i / SHARD_COUNT) * Math.PI * 2 + random(i) * 0.5;
    const distance = 400 * ((i % 3) + 1) * burst + (frame > 24 ? (frame - 24) * 1 : 0);
    const rotation = random(i * 2) * 360 + frame * (random(i * 3) - 0.5) * 2;
    const size = width * (0.03 + random(i * 4) * 0.05);

    return (
      <div key={i} style={{
        position: "absolute",
        left: width/2 + Math.cos(angle) * distance,
        top: height/2 + Math.sin(angle) * distance,
        width: size,
        height: size,
        backgroundColor: "#0A0A0A",
        border: `1px solid rgba(201,168,76, ${edgePulse})`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" // irregular shard shape
      }} />
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      {/* Revealed Text */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${textScale})`, opacity: textSpring }}>
            <div style={{
                color: "#FFF",
                fontFamily: "Inter, sans-serif",
                fontSize: 100,
                fontWeight: 900,
                textAlign: "center"
            }}>
                PRODUCTIVITY
            </div>
            <div style={{
                color: "#C9A84C",
                fontFamily: "Inter, sans-serif",
                fontSize: 100,
                fontWeight: 900,
                textAlign: "center",
                textShadow: bloomGlow
            }}>
                PROBLEM?
            </div>
      </AbsoluteFill>

      {/* Shards */}
      {shards}
    </AbsoluteFill>
  );
};
