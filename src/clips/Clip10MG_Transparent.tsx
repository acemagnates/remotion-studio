import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip10MG_Transparent = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (0 - 1s)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, mass: 2 },
    durationInFrames: 30,
  });

  // ACT 3: EXIT (3.0 - 3.5s)
  const exitStart = durationInFrames - 15;
  const exitSlam = spring({
    frame: frame - exitStart,
    fps,
    config: { damping: 10, stiffness: 300 },
  });

  // ANIMATIONS
  const splitProgress = interpolate(entrance, [0, 1], [0, 45]) * (1 - exitSlam);
  
  // Text Animation
  const textOpacity = interpolate(entrance, [0.5, 1], [0, 1]) * (1 - interpolate(frame, [exitStart, exitStart + 5], [0, 1]));
  const textScale = interpolate(frame, [0, durationInFrames], [1, 1.1]);

  // ACT 2: EVOLUTION (Gold Pulse)
  const pulse = interpolate(
    Math.sin((frame / 20) * Math.PI * 2),
    [-1, 1],
    [0.6, 1.0]
  );

  return (
    <AbsoluteFill>
      {/* Container representing the surface being split */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        
        {/* Left Half */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "rgba(20,20,20,0.9)", // Dark semi-transparent "door"
          transform: `translateX(-${splitProgress}%)`,
          borderRight: "2px solid #C9A84C",
          boxShadow: splitProgress > 0 ? `4px 0 20px rgba(0,0,0,0.8)` : "none"
        }} />

        {/* Right Half */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "rgba(20,20,20,0.9)",
          transform: `translateX(${splitProgress}%)`,
          borderLeft: "2px solid #C9A84C",
          boxShadow: splitProgress > 0 ? `-4px 0 20px rgba(0,0,0,0.8)` : "none"
        }} />

        {/* Central Gap Text */}
        <AbsoluteFill style={{ 
          justifyContent: "center", 
          alignItems: "center",
          opacity: textOpacity,
          transform: `scale(${textScale})`
        }}>
          <h1 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 100,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            letterSpacing: "0.1em",
            textShadow: "0 0 20px rgba(201,168,76,0.6)"
          }}>
            SUPPLY: ZERO
          </h1>
        </AbsoluteFill>

        {/* Fracture Line (centered overlay when closed/opening) */}
        {!exitSlam && (
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 4,
            height: "100%",
            transform: `translateX(-50%) translateX(${splitProgress > 0 ? (entrance > 0.5 ? -splitProgress : 0) : 0}%)`,
            backgroundColor: "#C9A84C",
            opacity: pulse * (1 - entrance),
            boxShadow: "0 0 15px #C9A84C"
          }} />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
