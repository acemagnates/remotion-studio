import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

const Fragment = ({ i, frame, exit }: { i: number; frame: number; exit: number }) => {
  const { fps, durationInFrames } = useVideoConfig();
  
  // ACT 1: ENTRANCE (violent radial burst 0.5-1.0s)
  const burst = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.5 },
  });

  const angle = (i * 137.5) % 360; // Distribution
  const speed = 200 + (i % 15) * 150;
  const distance = burst * speed;
  
  // ACT 2: HOLD + EVOLUTION (slow drift in 3D space)
  const slowDrift = interpolate(frame, [0, durationInFrames], [0, 80]);
  const rotation = interpolate(frame, [0, durationInFrames], [0, angle * 0.5]);
  
  const color = i % 3 === 0 ? "#0A0A0A" : "#C9A84C";
  
  // Fake 3D depth
  const translateZ = interpolate(frame, [0, durationInFrames], [0, i * 10]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 150 + (i % 5) * 40,
        height: 120 + (i % 3) * 60,
        backgroundColor: color,
        opacity: exit * 0.9,
        clipPath: `polygon(${(i*17)%30}% ${(i*11)%20}%, 100% ${(i*7)%30}%, ${(80+i*3)%100}% 100%, 0% ${(70+i*2)%100}%)`,
        transform: `translate(-50%, -50%) translate(${Math.cos(angle) * (distance + slowDrift)}px, ${Math.sin(angle) * (distance + slowDrift)}px) perspective(1000px) rotateX(${rotation}deg) rotateY(${rotation * 0.5}deg) translateZ(${translateZ}px)`,
        boxShadow: i % 3 !== 0 ? "0 0 30px rgba(201,168,76,0.6)" : "0 10px 40px rgba(0,0,0,0.8)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    />
  );
};

export const Clip05MG_Transparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ACT 3: EXIT (0.3–0.5s)
  const exit = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#00FF00', overflow: 'hidden' }}>
      <AbsoluteFill style={{ perspective: 2000 }}>
        {new Array(18).fill(0).map((_, i) => (
          <Fragment key={i} i={i} frame={frame} exit={exit} />
        ))}
      </AbsoluteFill>
      
      {/* Central light burst flash at start */}
      {frame < 20 && (
          <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 500, height: 500,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, white 0%, rgba(201,168,76,0.8) 40%, transparent 70%)',
              opacity: interpolate(frame, [0, 15], [1, 0]),
              filter: 'blur(40px)',
          }} />
      )}
    </AbsoluteFill>
  );
};
