import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";

const ParticleBurst = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const burstFrame = 0.7 * fps;
  const particleCount = 22;

  const particles = useMemo(() => {
    return new Array(particleCount).fill(0).map((_, i) => ({
      angle: (i / particleCount) * Math.PI * 2,
      speed: 0.8 + Math.random() * 2.5,
      size: 2 + Math.random() * 3,
    }));
  }, []);

  if (frame < burstFrame) return null;
  const progress = (frame - burstFrame) / (0.8 * fps);
  if (progress > 1) return null;
  const opacity = interpolate(progress, [0, 1], [1, 0], { extrapolateRight: "clamp" });

  return (
    <group>
      {particles.map((p, i) => {
        const dist = p.speed * (frame - burstFrame) * 3;
        const x = Math.cos(p.angle) * dist;
        const y = Math.sin(p.angle) * dist + (frame - burstFrame) * 0.5; // Upward drift
        return (
          <mesh key={i} position={[x, y, 0]}>
            <circleGeometry args={[p.size, 16]} />
            <meshBasicMaterial color="#C9A84C" transparent opacity={opacity} />
          </mesh>
        );
      })}
    </group>
  );
};

export const Clip05 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0-0.7s)
  // Counter surge
  const counter = Math.floor(interpolate(frame, [0, 30, 42], [0, 5000, 60000], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.8, 0, 0.2, 1)
  }));

  const entrance = spring({
    frame: frame - 42,
    fps,
    config: { damping: 8, stiffness: 200 }
  });
  const bounceY = interpolate(entrance, [0, 0.5, 1], [100, -20, 0]);

  const month9Y = interpolate(frame, [6, 30], [-50, 0], { extrapolateRight: "clamp" });

  // ACT 2: HOLD + EVOLUTION (0.7-2.0s)
  const path = "M 540 960 L 400 1100 L 200 1050 M 540 960 L 700 800 L 850 850";
  const { strokeDasharray, strokeDashoffset } = evolvePath(
    interpolate(frame, [42, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    path
  );

  const subscribersOpacity = interpolate(frame, [54, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const scale = interpolate(frame, [42, 120], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  // ACT 3: EXIT (2.0-2.5s)
  const exit = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp"
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#0A0A0A", 
      opacity: exit,
      fontFamily: "sans-serif",
      color: "white"
    }}>
      {/* Kintsugi Fracture */}
      <svg width={width} height={height} style={{ position: "absolute", pointerEvents: "none" }}>
        <path d={path} fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
      </svg>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${scale})` }}>
        {/* MONTH 9 */}
        <div style={{ 
          color: "#C9A84C", 
          fontSize: 24, 
          letterSpacing: "0.2em",
          transform: `translateY(${month9Y}px)`,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          marginBottom: 40
        }}>
          MONTH 9
        </div>

        {/* 60,000 */}
        <div style={{ 
          fontSize: width * 0.22, 
          fontWeight: 900,
          transform: `translateY(${bounceY}px)`,
          textShadow: "0 0 12px rgba(201,168,76,0.5)"
        }}>
          {counter.toLocaleString()}
        </div>

        {/* subscribers */}
        <div style={{ 
          fontSize: 22,
          opacity: subscribersOpacity,
          marginTop: 20
        }}>
          subscribers
        </div>
      </AbsoluteFill>

      <ThreeCanvas width={width} height={height} style={{ pointerEvents: "none" }}>
        <ParticleBurst />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
