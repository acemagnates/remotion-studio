import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

const DigitColumn: React.FC<{
  target: number;
  delay: number;
  duration: number;
}> = ({ target, delay, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    durationInFrames: duration,
    config: { damping: 10, stiffness: 150 },
  });

  const value = interpolate(progress, [0, 1], [0, target + 10]); // Overshoot animation
  const displayVal = Math.floor(value % 10);

  return (
    <div style={{ width: 60, textAlign: "center", overflow: "hidden" }}>
      {displayVal}
    </div>
  );
};

export const Clip05MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (0.0-0.5s = 15 frames)
  // "18 MONTHS LATER." types on
  const title = "18 MONTHS LATER.";
  const charsVisible = Math.floor(frame / 1); // 1 char per frame
  const displayedTitle = title.slice(0, charsVisible);

  // Counter starts at frame 15
  const counterStart = 15;
  const counterEnd = 63; // ~2.1s
  const isLocked = frame >= counterEnd;

  const counterProgress = spring({
    frame: frame - counterStart,
    fps,
    durationInFrames: counterEnd - counterStart,
    config: { damping: 10, stiffness: 150 },
  });

  const targetValue = 340000;
  const currentVal = Math.floor(interpolate(counterProgress, [0, 1], [0, targetValue]));
  const formattedVal = currentVal.toLocaleString();

  // ACT 2: HOLD + EVOLUTION (0.5-2.5s)
  const evolutionScale = interpolate(frame, [counterEnd, 75], [1, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "FOLLOWERS" springs up
  const followersEntrance = spring({
    frame: frame - counterEnd,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const followersY = interpolate(followersEntrance, [0, 1], [40, 0]);

  // Glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.7, 1]
  );

  // Particle burst at 2.1s (counterEnd)
  const burstFrame = frame - counterEnd;
  const burstProgress = spring({
    frame: burstFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  // ACT 3: EXIT (2.5-3.0s)
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  const numParticles = 12;
  const particles = new Array(numParticles).fill(0).map((_, i) => {
    const angle = (i / numParticles) * Math.PI * 2;
    const length = 50;
    const x2 = Math.cos(angle) * length;
    const y2 = Math.sin(angle) * length;
    const path = `M 0 0 L ${x2} ${y2}`;
    const { strokeDasharray, strokeDashoffset } = evolvePath(burstProgress, path);

    return (
      <svg
        key={i}
        style={{
          position: "absolute",
          overflow: "visible",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${Math.cos(angle) * 300}px, ${Math.sin(angle) * 300}px)`,
        }}
      >
        <path
          d={path}
          stroke="#C9A84C"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{ opacity: interpolate(burstProgress, [0.7, 1], [1, 0]) }}
        />
      </svg>
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            color: "#C9A84C",
            fontSize: 28,
            fontWeight: "bold",
            letterSpacing: "0.3em",
          }}
        >
          {displayedTitle}
        </div>

        {/* Counter */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${evolutionScale})`,
          }}
        >
          <div
            style={{
              fontSize: 180,
              fontWeight: 900,
              fontFamily: "sans-serif",
              color: "#FFF",
              textShadow: `
                0 0 4px rgba(201,168,76,${0.6 * glowPulse}),
                0 0 15px rgba(201,168,76,${0.2 * glowPulse})
              `,
            }}
          >
            {formattedVal}
          </div>

          {/* FOLLOWERS */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#C9A84C",
              letterSpacing: "0.4em",
              transform: `translateY(${followersY}px)`,
              opacity: followersEntrance,
            }}
          >
            FOLLOWERS
          </div>
        </div>
      </AbsoluteFill>
      {particles}
    </AbsoluteFill>
  );
};
