import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Clip15MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ACT 1 & 2: Violent Glitch
  // We'll create horizontal slices that displace
  const sliceCount = 12;
  const slices = new Array(sliceCount).fill(0).map((_, i) => {
    const seed = Math.sin(frame * 0.8 + i) * 100;
    const displaceX = (Math.random() - 0.5) * 100 * (frame > 5 ? 1 : 0.2);
    const rgbSplit = (Math.random()) * 20;
    const h = 100 / sliceCount;
    const top = i * h;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top: `${top}%`,
          left: 0,
          right: 0,
          height: `${h}%`,
          backgroundColor: "#0A0A0A",
          transform: `translateX(${displaceX}px)`,
          overflow: "hidden",
        }}
      >
        {/* Simulating content within slices to show RGB splitting */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 200,
          fontWeight: 900,
          color: "white",
          opacity: 0.1,
          fontFamily: "monospace"
        }}>
          ERROR
        </div>
        
        {/* RGB Split lines */}
        <div style={{
          position: "absolute",
          top: 0,
          left: -rgbSplit,
          width: "100%",
          height: "1px",
          backgroundColor: "red",
          opacity: 0.5
        }} />
        <div style={{
          position: "absolute",
          top: "100%",
          left: rgbSplit,
          width: "100%",
          height: "1px",
          backgroundColor: "cyan",
          opacity: 0.5
        }} />
      </div>
    );
  });

  // Noise overlays
  const noiseOpacity = interpolate(Math.random(), [0, 1], [0.05, 0.15]);

  // ACT 3: EXIT
  const isFinalFrame = frame >= durationInFrames - 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: isFinalFrame ? 0 : 1 }}>
      {slices}
      {/* Noise Band */}
      <div style={{
        position: "absolute",
        top: (frame * 20) % 100 + "%",
        left: 0,
        right: 0,
        height: "10%",
        backgroundColor: "white",
        opacity: 0.1,
        filter: "blur(20px)"
      }} />
    </AbsoluteFill>
  );
};
