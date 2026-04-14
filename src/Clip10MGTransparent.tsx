import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip10MGTransparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0.0 - 1.5s = 45 frames)
  // Fracture lines grow
  const branch1Progress = spring({
    frame,
    fps,
    durationInFrames: 45,
    config: { damping: 15, stiffness: 100 },
  });

  const branch2Progress = spring({
    frame: frame - 24, // 0.8s
    fps,
    durationInFrames: 30,
    config: { damping: 15, stiffness: 100 },
  });

  const branch3Progress = spring({
    frame: frame - 36, // 1.2s
    fps,
    durationInFrames: 24,
    config: { damping: 15, stiffness: 100 },
  });

  // Paths
  const path1 = "M 540 1920 L 400 1200 L 480 800";
  const path2 = "M 400 1200 L 700 1000";
  const path3 = "M 430 1000 L 300 900";

  const e1 = evolvePath(branch1Progress, path1);
  const e2 = evolvePath(branch2Progress, path2);
  const e3 = evolvePath(branch3Progress, path3);

  // ACT 2: HOLD + EVOLUTION (1.5 - 2.5s)
  // Text fade in
  const textOpacity = interpolate(frame, [60, 75], [0, 1]); // Starts at 2.0s
  const textScale = interpolate(frame, [60, durationInFrames], [1, 1.03]);

  // Brightness pulse
  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1]);

  // ACT 3: EXIT (2.5 - 3.0s)
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <svg
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <path
          d={path1}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="4"
          strokeDasharray={e1.strokeDasharray}
          strokeDashoffset={e1.strokeDashoffset}
          style={{ opacity: pulse }}
        />
        <path
          d={path2}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="3"
          strokeDasharray={e2.strokeDasharray}
          strokeDashoffset={e2.strokeDashoffset}
          style={{ opacity: pulse }}
        />
        <path
          d={path3}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="2"
          strokeDasharray={e3.strokeDasharray}
          strokeDashoffset={e3.strokeDashoffset}
          style={{ opacity: pulse }}
        />
      </svg>

      {/* Text Reveal */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${textScale}) rotate(-15deg)`,
          opacity: textOpacity,
          color: "#FFF",
          fontSize: 80,
          fontWeight: 900,
          textAlign: "center",
          width: "100%",
          textShadow: "0 0 20px rgba(201,168,76,0.6)",
        }}
      >
        THE ACTUAL UNLOCK
      </div>
    </AbsoluteFill>
  );
};
