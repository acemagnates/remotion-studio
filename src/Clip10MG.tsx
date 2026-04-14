import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip10MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE
  const crackSpring = spring({ frame, fps, config: { damping: 10, stiffness: 200 } });
  
  // Split start at 0.5s (frame 15)
  const splitSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const splitOffset = interpolate(splitSpring, [0, 1], [0, 400]);

  // ACT 2: EVOLUTION
  // Paperwork scroll
  const scrollY = (frame * 5) % 1000;
  
  const glowPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.5, 1]);

  // ACT 3: EXIT (Slam shut)
  const exitSpring = spring({
    frame: frame - (durationInFrames - 15),
    fps,
    config: { damping: 8, stiffness: 250 },
  });

  const finalSplitOffset = interpolate(exitSpring, [0, 1], [splitOffset, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Background revealed paperwork */}
      <AbsoluteFill style={{ 
        backgroundImage: "url('https://remotion.media/video.mp4')", // Placeholder for complex wall
        backgroundSize: "cover",
        opacity: 0.2
      }}>
        {/* Simulating scrolling bureaucratic paperwork */}
        <div style={{
          position: "absolute",
          top: -scrollY,
          left: 0,
          right: 0,
          color: "rgba(255,255,255,0.1)",
          fontFamily: "monospace",
          fontSize: 20,
          padding: 40,
          lineHeight: 1.5
        }}>
          {new Array(100).fill(" BUREAUCRACY RED TAPE CLASSIFIED DOCUMENT SECTION 84B-2 PROCUREMENT FORM 2293-X").join(" ")}
        </div>
      </AbsoluteFill>

      {/* Panels */}
      {/* Left Panel */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "50%",
        backgroundColor: "#0A0A0A",
        transform: `translateX(${-finalSplitOffset}px)`,
        borderRight: "2px solid #C9A84C",
        boxShadow: `0 0 ${20 * glowPulse}px #C9A84C`,
        zIndex: 2
      }} />

      {/* Right Panel */}
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "50%",
        backgroundColor: "#0A0A0A",
        transform: `translateX(${finalSplitOffset}px)`,
        borderLeft: "2px solid #C9A84C",
        boxShadow: `0 0 ${20 * glowPulse}px #C9A84C`,
        zIndex: 2
      }} />

      {/* Kintsugi Crack Line (Vertical Center) */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: "#C9A84C",
        transform: `translateX(-50%) scaleY(${crackSpring})`,
        opacity: interpolate(splitSpring, [0, 0.5], [1, 0]),
        zIndex: 3,
        boxShadow: "0 0 15px #C9A84C"
      }} />
    </AbsoluteFill>
  );
};
