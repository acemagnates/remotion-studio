import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip13: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (Branching Crack)
  const crackProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const path1 = "M 540 960 L 600 800 L 400 700 L 500 500 L 300 300";
  const path2 = "M 540 960 L 480 1120 L 680 1220 L 580 1420 L 780 1620";
  
  const evolved1 = evolvePath(crackProgress, path1);
  const evolved2 = evolvePath(crackProgress, path2);

  // ACT 2: HOLD + EVOLUTION (Text Red + Thickening)
  const textOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const strokeWidth = interpolate(frame, [45, durationInFrames], [4, 12]);

  // ACT 3: EXIT (Shatter/Fall)
  const exitStart = durationInFrames - 15;
  const exitFall = spring({
    frame: frame - exitStart,
    fps,
  });
  const fallY = interpolate(exitFall, [0, 1], [0, 1000]);

  return (
    <AbsoluteFill style={{ 
      justifyContent: "center", 
      alignItems: "center",
      transform: `translateY(${fallY}px)`,
    }}>
      <svg style={{ position: "absolute", width: "100%", height: "100%", overflow: "visible" }}>
        <path
          d={path1}
          stroke="#C9A84C"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={evolved1.strokeDasharray}
          strokeDashoffset={evolved1.strokeDashoffset}
        />
        <path
          d={path2}
          stroke="#C9A84C"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={evolved2.strokeDasharray}
          strokeDashoffset={evolved2.strokeDashoffset}
        />
      </svg>

      <h1 style={{
        fontFamily: "Impact, sans-serif",
        fontSize: 180,
        color: "#FF0000",
        fontWeight: 900,
        margin: 0,
        opacity: textOpacity,
        textShadow: "0 0 30px rgba(255,0,0,0.8)",
        transform: `scale(${1 + (frame * 0.001)})`,
      }}>
        PUNISHED
      </h1>
    </AbsoluteFill>
  );
};
