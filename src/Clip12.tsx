import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip12 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Fracture paths
  const paths = [
    "M 540 960 L 300 600 L 100 700",
    "M 540 960 L 800 1300 L 1000 1200",
    "M 540 960 L 600 800",
    "M 540 960 L 450 1100"
  ];

  const mainProgress = interpolate(frame, [0, 24], [0, 1], { extrapolateRight: "clamp" });
  const secProgress = interpolate(frame, [0, 36], [0, 1], { extrapolateRight: "clamp" });

  const fragmentShift = interpolate(frame, [27, 45], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drift = (frame - 45) > 0 ? (frame - 45) * 0.05 : 0;

  const textSpring = spring({ frame, fps, delay: 36, config: { damping: 200 } });
  const textScale = interpolate(frame, [0, durationInFrames], [1, 1.03]);

  const bloomGlow = "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)";
  const crackGlow = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1]);

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${textScale})` }}>
         {/* Fragmented Backing (Simplified as shifting pieces) */}
         <div style={{ position: "absolute", width: "100%", height: "100%", opacity: textSpring }}>
            <div style={{
                color: "#FFF",
                fontFamily: "Inter, sans-serif",
                fontSize: 90,
                fontWeight: 900,
                textAlign: "center",
                transform: `translateY(${-fragmentShift - drift}px)`
            }}>
                SCHEDULE HIS BRAIN
            </div>
            <div style={{
                color: "#C9A84C",
                fontFamily: "Inter, sans-serif",
                fontSize: 90,
                fontWeight: 900,
                textAlign: "center",
                textShadow: bloomGlow,
                transform: `translateY(${fragmentShift + drift}px)`
            }}>
                FOR FREE.
            </div>
         </div>
      </AbsoluteFill>

      {/* Fracture Lines */}
      <svg width={width} height={height} style={{ position: "absolute", pointerEvents: "none" }}>
        {paths.map((p, i) => {
            const progress = i < 2 ? mainProgress : secProgress;
            const { strokeDasharray, strokeDashoffset } = evolvePath(progress, p);
            return (
                <path 
                    key={i}
                    d={p} 
                    stroke="#C9A84C" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    style={{ opacity: crackGlow }}
                />
            );
        })}
      </svg>
    </AbsoluteFill>
  );
};
