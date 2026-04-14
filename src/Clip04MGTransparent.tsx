import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import * as THREE from "three";

const Particle: React.FC<{
  seed: number;
  width: number;
  height: number;
}> = ({ seed, width, height }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Deterministic random values based on seed
  const params = useMemo(() => {
    const random = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    const z = random(seed) * -200; //-200 to 0
    const xBase = (random(seed + 1) - 0.5) * width;
    const yStart = (random(seed + 2) - 0.5) * height * 2;
    const ySpeed = 1 + random(seed + 3) * 2; // 1-3 px/frame
    const xDrift = random(seed + 4) * 1; // ±0.5 drift
    const radius = 2 + random(seed + 5) * 4; // 2-6 px radius
    const opacity = 0.4 + random(seed + 6) * 0.5;

    return { z, xBase, yStart, ySpeed, xDrift, radius, opacity };
  }, [seed, width, height]);

  // ACT 1: ENTRANCE (0-15 frames)
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ACT 3: EXIT (last 9 frames)
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  // Parallax: near particles (z > 0 equivalent in relative terms, here z near 0) move 2.5x faster
  // Normalized z: 0 (near) to 1 (far)
  const zNorm = Math.abs(params.z) / 200;
  const parallaxSpeed = interpolate(zNorm, [0, 1], [2.5, 1]);

  const y = params.yStart + frame * params.ySpeed * parallaxSpeed;
  const x = params.xBase + Math.sin(frame * 0.05 + seed) * params.xDrift * 20;

  // Pulse opacity
  const pulse = interpolate(Math.sin(frame * 0.1 + seed), [-1, 1], [-0.15, 0.15]);

  return (
    <mesh position={[x, y, params.z]}>
      <sphereGeometry args={[params.radius, 16, 16]} />
      <meshBasicMaterial
        color="#C9A84C"
        transparent
        opacity={params.opacity * entranceOpacity * exitOpacity + pulse}
      />
    </mesh>
  );
};

export const Clip04MGTransparent: React.FC = () => {
  const { width, height } = useVideoConfig();

  const particles = useMemo(() => {
    return new Array(18).fill(0).map((_, i) => (
      <Particle key={i} seed={i * 123.45} width={width} height={height} />
    ));
  }, [width, height]);

  return (
    <AbsoluteFill>
      <ThreeCanvas
        width={width}
        height={height}
        orthographic
        camera={{
          left: -width / 2,
          right: width / 2,
          top: height / 2,
          bottom: -height / 2,
          near: 0.1,
          far: 1000,
          position: [0, 0, 500],
        }}
        alpha={true}
      >
        <ambientLight intensity={1} />
        {particles}
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
