import { AbsoluteFill, useCurrentFrame } from "remotion";

const words = ["20 COURSES", "FOAM", "GOLD LEAF", "TWEEZERS"];

export const WordFlashMontage = () => {
  const frame = useCurrentFrame();
  const wordIndex = Math.floor(frame / 10) % words.length;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      <h1
        style={{
          color: "white",
          fontSize: 140,
          fontWeight: 900,
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          letterSpacing: 4,
          textShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
          padding: "0 20px",
        }}
      >
        {words[wordIndex]}
      </h1>
    </AbsoluteFill>
  );
};
