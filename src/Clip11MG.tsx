import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip11MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const mapOpacity = interpolate(frame, [0, 15], [0, 1]);
  
  // Flight paths
  const pathsProgress = interpolate(frame, [15, 45], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  // ACT 2: EVOLUTION (Zoom and Glow signal)
  const mapScale = interpolate(frame, [0, durationInFrames], [1, 1.15]);
  const signalPos = interpolate(frame % 30, [0, 30], [0, 1]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });

  // Simplified flight paths (curved arcs)
  const paths = [
    "M 200 1500 Q 500 1000 800 1500",
    "M 300 1200 Q 540 600 780 1200",
    "M 100 1000 Q 500 500 900 1000",
    "M 400 1700 Q 600 1400 800 1700",
    "M 150 1300 Q 540 800 930 1300",
  ];

  const counterValue = Math.floor(interpolate(frame, [15, 60], [0, 1000000], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      <AbsoluteFill style={{ 
        transform: `scale(${mapScale})`,
        opacity: mapOpacity,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {/* Simplified Map representation - Coastline */}
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <path 
            d="M 0 1600 C 200 1500 400 1700 600 1600 S 800 1500 1080 1600 V 1920 H 0 Z" 
            fill="rgba(255,255,255,0.05)" 
          />
          
          {paths.map((p, i) => {
            const { strokeDasharray, strokeDashoffset } = evolvePath(pathsProgress, p);
            return (
              <g key={i}>
                <path
                  d={p}
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="2"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  style={{ filter: "drop-shadow(0 0 5px rgba(201,168,76,0.6))" }}
                />
                {/* Signal Pulse */}
                <circle r="4" fill="white">
                  <animateMotion dur="2s" repeatCount="indefinite" path={p} />
                </circle>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Data Counter */}
      <div style={{
        position: "absolute",
        top: 100,
        right: 100,
        fontFamily: "monospace",
        fontSize: 80,
        color: "#C9A84C",
        fontWeight: "bold",
        textShadow: "0 0 20px rgba(201,168,76,0.8)"
      }}>
        {counterValue.toLocaleString()}
      </div>
    </AbsoluteFill>
  );
};
