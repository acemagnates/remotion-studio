import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";

export const Clip16MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const textSlide = interpolate(entrance, [0, 1], [50, 0]);
  const textOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // ACT 2: HOLD + EVOLUTION
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.05]);
  const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const ringShoot = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, 2000], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill>
      {/* 3D Orbital Ring */}
      <ThreeCanvas width={width} height={height} alpha={true}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#C9A84C" />
        <mesh rotation={[Math.PI / 3, rotation * (Math.PI / 180), 0]} position={[0, -1, ringShoot / 100]}>
          <torusGeometry args={[3.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={2} />
        </mesh>
      </ThreeCanvas>

      {/* Text */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: "20%", height: "20%" }}>
        <h1
          style={{
            fontFamily: "Impact, sans-serif",
            fontSize: 200,
            color: "#FFFFFF",
            margin: 0,
            opacity: textOpacity * exit,
            transform: `translateY(${textSlide}px) scale(${scale})`,
            textShadow: "0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(201,168,76,0.3)",
            letterSpacing: 10
          }}
        >
          VALUABLE
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
