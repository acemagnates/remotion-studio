import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  Img,
} from "remotion";

const GraphBar: React.FC<{
  height: number;
  label: string;
  delay: number;
}> = ({ height, label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const grow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "0 20px" }}>
      <div
        style={{
          width: 80,
          height: grow * height * 4,
          background: "linear-gradient(to top, #722F37, #C5A059)",
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 0 20px rgba(197, 160, 89, 0.4)",
        }}
      />
      <div style={{ color: "#C5A059", marginTop: 10, fontSize: 24, fontWeight: "bold" }}>{label}</div>
    </div>
  );
};

export const RomanEmpireScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Text Morphism interpolation
  const blur = interpolate(frame, [0, 30, 60], [20, 0, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const letterSpacing = interpolate(frame, [0, 60], [40, 5], { extrapolateRight: "clamp" });
  const scale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Background Ken Burns effect
  const bgScale = interpolate(frame, [0, 150], [1, 1.1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Cinematic Background */}
      <AbsoluteFill style={{ transform: `scale(${bgScale})` }}>
        <Img
          src={staticFile("roman.png")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <AbsoluteFill
          style={{
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9))",
          }}
        />
      </AbsoluteFill>

      {/* Text Morphism Overlay */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 200,
        }}
      >
        <h1
          style={{
            fontSize: 160,
            fontWeight: "900",
            color: "#FFF",
            margin: 0,
            textShadow: "0 0 30px rgba(0,0,0,0.8)",
            opacity,
            filter: `blur(${blur}px)`,
            letterSpacing: `${letterSpacing}px`,
            transform: `scale(${scale})`,
            fontFamily: "serif",
            textAlign: "center",
          }}
        >
          ETERNAL ROME
        </h1>
      </AbsoluteFill>

      {/* Stat Graph */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 100,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ color: "#C5A059", fontSize: 40, margin: 0, letterSpacing: 4 }}>MILITARY DOMINANCE</h2>
          <p style={{ color: "#FFF", opacity: 0.6, fontSize: 18 }}>TERRITORIAL XPANSION RATE (300 BC - 117 AD)</p>
        </div>
        
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <GraphBar height={50} label="REPUBLIC" delay={60} />
          <GraphBar height={80} label="AUGUSTUS" delay={70} />
          <GraphBar height={100} label="TRAJAN" delay={80} />
          <GraphBar height={70} label="DECLINE" delay={90} />
        </div>
      </AbsoluteFill>

      {/* Decorative Border */}
      <AbsoluteFill
        style={{
          border: "20px solid rgba(197, 160, 89, 0.2)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
