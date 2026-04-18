import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const Bar = ({ height, delay }: { height: number; delay: number }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  const growth = spring({
    frame,
    fps,
    delay,
    config: { damping: 10, stiffness: 120 }
  });

  const exit = spring({
    frame: frame - (durationInFrames - 15),
    fps,
    config: { damping: 20, stiffness: 100 }
  });

  const currentHeight = interpolate(growth, [0, 1], [0, height]) * interpolate(exit, [0, 1], [1, 0]);
  const shimmerY = (frame * 10 + delay * 50) % (height + 200);

  return (
    <div style={{
      width: 120,
      height: currentHeight,
      backgroundColor: "#FFF",
      margin: "0 15px",
      borderRadius: "4px 4px 0 0",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 0 20px rgba(255,255,255,0.2)"
    }}>
        <div style={{
            position: "absolute",
            top: shimmerY - 100,
            left: 0,
            right: 0,
            height: 100,
            background: "linear-gradient(to bottom, transparent, #C9A84C, transparent)",
            opacity: 0.6
        }} />
    </div>
  );
};

export const Clip04MG = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  
  const dollarSlam = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 150 }
  });
  const dollarScale = interpolate(dollarSlam, [0, 1], [0, 1]) * interpolate(Math.sin(frame * 0.15), [-1, 1], [1, 1.1]);

  const exit = spring({
    frame: frame - (durationInFrames - 15),
    fps,
    config: { damping: 20, stiffness: 100 }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <AbsoluteFill style={{ opacity: 0.05 }}>
        {[...Array(12)].map((_, i) => (
            <div key={i} style={{ position: "absolute", bottom: 400 + i * 100, left: 100, right: 100, height: 1, backgroundColor: "#FFF" }} />
        ))}
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 200 }}>
        <div style={{ display: "flex", alignItems: "flex-end", height: 800 }}>
            <Bar height={350} delay={10} />
            <Bar height={550} delay={14} />
            <Bar height={750} delay={18} />
            <Bar height={450} delay={22} />
        </div>
      </AbsoluteFill>

      <div style={{
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: `translateX(-50%) scale(${dollarScale})`,
        opacity: dollarSlam,
      }}>
        <h2 style={{
          fontSize: 220,
          fontWeight: 900,
          color: "#C9A84C",
          margin: 0,
          textShadow: "0 0 40px rgba(201,168,76,0.8), 0 0 80px rgba(201,168,76,0.4)"
        }}>
          $$$
        </h2>
      </div>

      <div style={{
        position: "absolute",
        bottom: 200,
        left: 150,
        right: 150,
        height: 6,
        backgroundColor: "#C9A84C",
        transformOrigin: "left",
        transform: `scaleX(${entrance})`,
        boxShadow: "0 0 15px #C9A84C"
      }} />
      <div style={{
        position: "absolute",
        bottom: 200,
        left: 150,
        width: 6,
        height: 850,
        backgroundColor: "#C9A84C",
        transformOrigin: "bottom",
        transform: `scaleY(${entrance})`,
        boxShadow: "0 0 15px #C9A84C"
      }} />
    </AbsoluteFill>
  );
};
