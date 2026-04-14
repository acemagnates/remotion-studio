import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip06MG: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0.0 - 0.6s = 18 frames)
  // Title reveal
  const title = "PIPELINE RESULTS";
  const titleOpacity = interpolate(frame, [0, 10], [0, 1]);

  // Baseline reveal
  const baselineProgress = spring({
    frame: frame - 9,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const baselineWidth = interpolate(baselineProgress, [0, 1], [0, 800]);

  // Bar 1 (Left, "BEFORE")
  const bar1Entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const bar1Height = interpolate(bar1Entrance, [0, 1], [0, 200]);

  // ACT 2: HOLD + EVOLUTION (0.6 - 2.5s)
  // Bar 2 (Right, "AFTER") starts at frame 18
  const bar2Entrance = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const bar2Height = interpolate(bar2Entrance, [0, 1], [0, 600]);

  // Gold shimmer effect for bar 2
  const shimmerPos = interpolate(frame % 45, [0, 45], [-100, 200]);

  // labels reveal
  const label1Visible = frame > 12;
  const label2Visible = frame > 30;

  // "3x" callout springs in at frame 60 (~2.0s)
  const calloutEntrance = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const calloutScale = interpolate(calloutEntrance, [0, 1], [0, 1]);

  // Continuous micro-shimmer pulse on top edges
  const edgePulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.8, 1]);

  // ACT 3: EXIT (2.5 - 3.0s)
  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          width: "100%",
          textAlign: "center",
          color: "#C9A84C",
          fontSize: 24,
          fontWeight: "bold",
          letterSpacing: "0.2em",
          opacity: titleOpacity,
        }}
      >
        {title}
      </div>

      {/* Bar Chart Area */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: "25%",
        }}
      >
        {/* Baseline */}
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            left: "50%",
            transform: "translateX(-50%)",
            width: baselineWidth,
            height: 2,
            backgroundColor: "#C9A84C",
            opacity: 0.6,
          }}
        />

        {/* Bars Container */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 120,
            zIndex: 5,
          }}
        >
          {/* Bar 1: BEFORE */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#C9A84C",
                fontSize: 14,
                fontWeight: "bold",
                marginBottom: 10,
                opacity: label1Visible ? 1 : 0,
              }}
            >
              BEFORE
            </div>
            <div
              style={{
                width: 140,
                height: bar1Height,
                backgroundColor: "#3A5A7C",
                border: "1px solid #C9A84C",
                boxShadow: `0 0 10px rgba(201,168,76,${0.2 * edgePulse})`,
              }}
            />
          </div>

          {/* Bar 2: AFTER */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                color: "#C9A84C",
                fontSize: 14,
                fontWeight: "bold",
                marginBottom: 10,
                opacity: label2Visible ? 1 : 0,
              }}
            >
              AFTER
            </div>
            <div
              style={{
                width: 140,
                height: bar2Height,
                backgroundColor: "#C9A84C",
                border: "1px solid #C9A84C",
                overflow: "hidden",
                position: "relative",
                boxShadow: `0 0 20px rgba(201,168,76,${0.4 * edgePulse})`,
              }}
            >
              {/* Shimmer */}
              <div
                style={{
                  position: "absolute",
                  top: `${shimmerPos}%`,
                  left: 0,
                  right: 0,
                  height: "20%",
                  background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)",
                  transform: "skewY(-10deg)",
                }}
              />
            </div>

            {/* 3x Callout */}
            <div
              style={{
                position: "absolute",
                top: -100,
                right: -120,
                transform: `scale(${calloutScale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "2px solid #C9A84C",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <span style={{ color: "#FFF", fontSize: 32, fontWeight: 900 }}>3×</span>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
