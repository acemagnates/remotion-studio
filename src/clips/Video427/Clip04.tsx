import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";

export const Clip04 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE (Digital Distort)
  const glitchActive = frame < 45;
  const intensity = interpolate(frame, [0, 10, 30, 45], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ACT 2: HOLD + EVOLUTION (VHS Roll)
  const vhsPos = (frame * 10) % height;
  const flicker = 0.3 + random(frame) * 0.5;

  // ACT 3: EXIT
  const exitOpacity = frame >= durationInFrames - 5 ? 0 : 1;

  // RGB Split Elements
  const slices = new Array(8).fill(0).map((_, i) => {
    const yStart = (i * height) / 8;
    const yEnd = ((i + 1) * height) / 8;
    const xOffset = Math.sin(frame * 0.8 + i) * 50 * intensity;
    const rgbOffset = Math.cos(frame * 0.5 + i) * 20 * intensity;

    return (
      <AbsoluteFill
        key={i}
        style={{
          clipPath: `inset(${yStart}px 0 ${height - yEnd}px 0)`,
          transform: `translateX(${xOffset}px)`,
          opacity: intensity * flicker * exitOpacity,
        }}
      >
        {/* Red Channel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255, 0, 0, 0.3)",
            transform: `translateX(${rgbOffset}px)`,
          }}
        />
        {/* Blue Channel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 255, 0.3)",
            transform: `translateX(${-rgbOffset}px)`,
          }}
        />
        {/* Scanlines */}
        <div
          style={{
            position: "absolute",
            top: vhsPos,
            width: "100%",
            height: 4,
            backgroundColor: "rgba(255,255,255,0.8)",
            boxShadow: "0 0 20px #FFF",
          }}
        />
      </AbsoluteFill>
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF00" }}>
      {/* Glitch Overlay */}
      {slices}
      
      {/* Overall Static Noise */}
      <AbsoluteFill
        style={{
          opacity: intensity * 0.2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Lock Symbol (Representation of "digital lock override") */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: intensity }}>
        <div
            style={{
                width: 300,
                height: 300,
                border: "10px solid #C9A84C",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#C9A84C",
                fontSize: 60,
                fontWeight: 900,
                textShadow: "0 0 20px #C9A84C",
                transform: `scale(${1 + intensity * 0.2})`,
            }}
        >
            LOCKED
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
