import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
export const MainScene = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  // ACT 1: ENTRANCE
  const s = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const titleY = interpolate(s, [0, 1], [200, 0]);
  const lineW = interpolate(frame, [15, 45], [0, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // ACT 2: HOLD + EVOLUTION (never static)
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08]);
  const gShift = interpolate(frame, [0, durationInFrames], [50, 55]);
  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  // Gold particles (15 max, transform only, no top/left)
  const particles = new Array(15).fill(0).map((_, i) => (
    <div key={i} style={{ position: "absolute", width: (i%3)*2+2, height: (i%3)*2+2,
      backgroundColor: "#C9A84C", borderRadius: "50%", opacity: ((i%5)*0.12+0.15)*exit,
      transform: `translate(${(i*73)%1080}px, ${1920-((frame*((i%3)+0.5)*1.5+i*130)%2200)}px)` }} />
  ));
  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${gShift}% 45%, rgba(30,25,15,1) 0%, rgba(5,5,5,1) 60%, rgba(0,0,0,1) 100%)` }} />
      {particles}
      <div style={{ position: "absolute", top: "46%", left: "50%", transform: "translateX(-50%)", width: lineW, height: 1, backgroundColor: "#C9A84C", opacity: 0.8 }} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1 style={{ fontFamily: "sans-serif", fontSize: 72, color: "#FFF", fontWeight: 900, letterSpacing: "0.08em",
          transform: `translateY(${titleY}px) scale(${s * scale})`, textAlign: "center",
          textShadow: "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)", margin: 0 }}>
          SYSTEM INITIALIZED
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
