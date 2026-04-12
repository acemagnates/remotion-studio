import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const ArchitecturalGraph = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Drawing duration: 1s (60 frames)
  const drawProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const percentage = Math.round(drawProgress * 100);

  // Graph endpoints
  const startX = width * 0.2;
  const startY = height * 0.7;
  const endX = startX + (width * 0.6) * drawProgress;
  const endY = startY - (width * 0.6) * drawProgress; // 45 degree angle

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Gold Gradient Fade */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {/* Fill Area */}
        <path
          d={`M ${startX} ${startY} L ${endX} ${endY} L ${endX} ${startY} Z`}
          fill="url(#goldGradient)"
        />

        {/* Gold Line */}
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#C9A84C"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 10px #C9A84C)" }}
        />
      </svg>

      {/* Ticking Numbers */}
      <div
        style={{
          position: "absolute",
          left: endX + 20,
          top: endY - 40,
          color: "white",
          fontFamily: "system-ui, sans-serif",
          fontSize: 80,
          fontWeight: 900,
          textShadow: "0 0 20px rgba(201, 168, 76, 0.8)",
        }}
      >
        +{percentage}%
      </div>
    </AbsoluteFill>
  );
};
