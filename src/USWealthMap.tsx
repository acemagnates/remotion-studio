import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";

// Major wealth hubs with normalized coordinates (x, y) relative to center
const wealthHubs = [
  { name: "New York", x: 0.85, y: -0.1, wealth: 1.0 },
  { name: "Silicon Valley", x: -0.9, y: 0.1, wealth: 0.95 },
  { name: "Los Angeles", x: -0.85, y: 0.3, wealth: 0.8 },
  { name: "Chicago", x: 0.3, y: -0.15, wealth: 0.6 },
  { name: "Miami", x: 0.75, y: 0.8, wealth: 0.5 },
  { name: "Seattle", x: -0.8, y: -0.5, wealth: 0.45 },
  { name: "Austin", x: 0.0, y: 0.5, wealth: 0.4 },
];

const WealthPillar: React.FC<{
  x: number;
  y: number;
  height: number;
  delay: number;
}> = ({ x, y, height, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const grow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  const finalHeight = grow * height * 4;

  return (
    <mesh position={[x * 5, finalHeight / 2 - 2, y * 3]}>
      <boxGeometry args={[0.2, finalHeight, 0.2]} />
      <meshStandardMaterial
        color="#EAB308"
        emissive="#EAB308"
        emissiveIntensity={interpolate(grow, [0, 1], [0, 2])}
      />
    </mesh>
  );
};

export const USWealthMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
  });

  const mapRotation = frame * 0.005;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", color: "white" }}>
      {/* Background Grid Accent */}
      <AbsoluteFill
        style={{
          opacity: 0.1,
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 3D Map Visualization */}
      <AbsoluteFill style={{ opacity }}>
        <ThreeCanvas width={width} height={height}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#EAB308" />
          
          <group rotation={[0.4, mapRotation, 0]}>
            {/* Simplified US Map Base */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
              <planeGeometry args={[10, 6]} />
              <meshStandardMaterial color="#111" />
            </mesh>

            {/* Wealth Pillars */}
            {wealthHubs.map((hub, i) => (
              <WealthPillar
                key={hub.name}
                x={hub.x}
                y={hub.y}
                height={hub.wealth}
                delay={30 + i * 5}
              />
            ))}
          </group>
        </ThreeCanvas>
      </AbsoluteFill>

      {/* UI Overlay */}
      <AbsoluteFill
        style={{
          padding: 60,
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent 30%, transparent 70%, rgba(0,0,0,0.8))",
        }}
      >
        <div style={{ textAlign: "center", transform: `scale(${titleScale})` }}>
          <h1
            style={{
              fontSize: 80,
              fontWeight: "900",
              margin: 0,
              letterSpacing: "-2px",
              background: "linear-gradient(to right, #FFF, #EAB308)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            THE RICHEST 1%
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#666",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            CONCENTRATION ACROSS THE U.S.
          </p>
        </div>

        <div
          style={{
            width: "100%",
            textAlign: "left",
            opacity: interpolate(frame, [150, 180], [0, 1], {
              extrapolateLeft: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#EAB308",
              fontWeight: "800",
              borderLeft: "4px solid #EAB308",
              paddingLeft: 20,
            }}
          >
            TOP WEALTH HUBS
          </div>
          <div style={{ marginTop: 20, fontSize: 40, fontWeight: "bold" }}>
            {wealthHubs
              .filter((_, i) => i < interpolate(frame, [150, 250], [0, 7]))
              .map((hub) => (
                <div key={hub.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span>{hub.name}</span>
                  <span style={{ color: "#EAB308" }}>{(hub.wealth * 100).toFixed(0)}% Intensity</span>
                </div>
              ))}
          </div>
        </div>
      </AbsoluteFill>

      {/* Aesthetic Accents */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 200,
            height: 2,
            background: "#EAB308",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 200,
            height: 2,
            background: "#EAB308",
            opacity: 0.5,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
