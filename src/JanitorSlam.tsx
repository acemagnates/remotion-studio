import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ThreeCanvas } from '@remotion/three';

export const JanitorSlam = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Number counting animation (0 to 8,000,000 in 40 frames)
  const rawNumber = interpolate(frame, [0, 40], [0, 8000000], {
    extrapolateRight: 'clamp',
  });
  const formattedNumber = Math.floor(rawNumber).toLocaleString();

  // Slam effect (starts at frame 40)
  const slamProgress = spring({
    frame: frame - 40,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Scale: 2 -> 1
  const scale = interpolate(slamProgress, [0, 1], [3, 1]);
  // Shake effect on impact
  const shake = interpolate(slamProgress, [0, 0.1, 0.2, 0.3, 0.4], [0, 10, -8, 5, 0]);

  // Texture/Lighting state
  const rotationY = frame * 0.01;

  return (
    <AbsoluteFill style={{ backgroundColor: '#050505', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      {/* 3D Background Elements */}
      <AbsoluteFill style={{ opacity: 0.4 }}>
        <ThreeCanvas width={width} height={height}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
          <mesh rotation={[0, rotationY, frame * 0.005]}>
            <torusKnotGeometry args={[10, 3, 100, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} />
          </mesh>
        </ThreeCanvas>
      </AbsoluteFill>

      {/* Main UI */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', transform: `translateY(${shake}px)` }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `scale(${scale})`,
          textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
        }}>
          <h1 style={{
            fontSize: 240,
            fontWeight: 900,
            color: '#FFD700', // Gold
            margin: 0,
            letterSpacing: '-5px',
          }}>
            ${formattedNumber}
          </h1>
          <h2 style={{
            fontSize: 120,
            fontWeight: 800,
            color: 'white',
            margin: 0,
            letterSpacing: '20px',
            opacity: frame > 45 ? 1 : 0,
            transform: `translateY(${frame > 45 ? 0 : 50}px)`,
            transition: 'all 0.3s ease-out',
          }}>
            JANITOR
          </h2>
        </div>
      </AbsoluteFill>

      {/* Speed lines/Impact overlay */}
      {frame >= 40 && frame <= 45 && (
        <AbsoluteFill style={{
          backgroundColor: 'white',
          opacity: interpolate(frame, [40, 45], [0.3, 0]),
        }} />
      )}
    </AbsoluteFill>
  );
};
