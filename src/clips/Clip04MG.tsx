import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const Bar = ({ height, delay, color }: { height: number; delay: number; color: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const growth = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 100 }
  });

  const exit = spring({
    frame: frame - 60,
    fps,
    config: { damping: 20, stiffness: 100 }
  });

  const currentHeight = interpolate(growth, [0, 1], [0, height]) * interpolate(exit, [0, 1], [1, 0]);
  const shimmer = interpolate(Math.sin(frame * 0.2 + delay), [-1, 1], [0.8, 1]);

  return (
    <div style={{
      width: 100,
      height: currentHeight,
      backgroundColor: color,
      margin: "0 20px",
      borderRadius: "10px 10px 0 0",
      boxShadow: `0 0 20px ${color}80`,
      opacity: shimmer
    }} />
  );
};

export const Clip04MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const dollarSlam = spring({
    frame: frame - 30,
    fps,
    config: { damping: 10, stiffness: 200 }
  });
  const dollarScale = interpolate(dollarSlam, [0, 1], [0, 1.5]);
  const dollarPulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [1, 1.1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", padding: 100 }}>
      {/* Background Grid */}
      <AbsoluteFill style={{ opacity: 0.1 }}>
        {new Array(10).fill(0).map((_, i) => (
          <div key={i} style={{ position: "absolute", top: i * 200, left: 0, right: 0, height: 2, backgroundColor: "#FFF" }} />
        ))}
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-end", paddingBottom: 300, flexDirection: "row" }}>
        <Bar height={400} delay={0} color="#FFF" />
        <Bar height={600} delay={5} color="#FFF" />
        <Bar height={900} delay={10} color="#C9A84C" />
        <Bar height={500} delay={15} color="#FFF" />
      </AbsoluteFill>

      <div style={{
        position: "absolute",
        top: 400,
        left: "50%",
        transform: `translateX(-50%) scale(${dollarScale * dollarPulse})`,
        opacity: dollarSlam,
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: 200,
          fontWeight: 900,
          color: "#C9A84C",
          margin: 0,
          textShadow: "0 0 30px rgba(201,168,76,0.8)"
        }}>
          $$$
        </h2>
      </div>

      {/* Axis lines */}
      <div style={{
        position: "absolute",
        bottom: 300,
        left: 200,
        right: 200,
        height: 4,
        backgroundColor: "#C9A84C",
        opacity: interpolate(frame, [0, 15], [0, 1])
      }} />
      <div style={{
        position: "absolute",
        bottom: 300,
        left: 200,
        width: 4,
        top: 200,
        backgroundColor: "#C9A84C",
        opacity: interpolate(frame, [0, 15], [0, 1])
      }} />
    </AbsoluteFill>
  );
};
