import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useMemo } from "react";

export const Clip07MGTransparent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Defined glitch frames: 3, 7, 12, 18, 22
  const glitchIntensity = useMemo(() => {
    if (frame === 3) return 1;
    if (frame === 7) return 0.8;
    if (frame === 12) return 0.6;
    if (frame === 18) return 0.4;
    if (frame === 22) return 0.2;
    return 0;
  }, [frame]);

  // ACT 1 & 2: GLITCH PULSES
  const numBands = 8;
  const bands = useMemo(() => {
    return new Array(numBands).fill(0).map((_, i) => {
      const randomOffset = (Math.sin(i * 123 + frame) * 40 * glitchIntensity);
      return randomOffset;
    });
  }, [numBands, frame, glitchIntensity]);

  // Static noise: ~30 single-pixel flickering white dots
  const points = useMemo(() => {
    return new Array(30).fill(0).map((_, i) => ({
      x: (Math.sin(i * 543 + frame) * 0.5 + 0.5) * 1080,
      y: (Math.cos(i * 321 + frame) * 0.5 + 0.5) * 1920,
      visible: Math.sin(frame * i) > 0.8,
    }));
  }, [frame]);

  // RGB Fringe ghosts
  const rgbVisible = glitchIntensity > 0;

  // ACT 3: EXIT (1.1s - 1.5s)
  const exit = interpolate(
    frame,
    [33, 45], // 1.1s to 1.5s (30fps)
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      {/* Glitch Bands content would typically be applied to a child, 
          but since this is a transparent overlay, we generate the distortion elements itself */}
      
      {/* RGB Channel Offset Simulation */}
      {rgbVisible && (
        <>
          {/* Red Layer */}
          <AbsoluteFill style={{ transform: `translateX(4px)`, opacity: 0.35 * glitchIntensity }}>
            <div style={{ width: "100%", height: "100%", border: "2px solid #FF0000" }} />
          </AbsoluteFill>
          {/* Blue Layer */}
          <AbsoluteFill style={{ transform: `translateX(-4px)`, opacity: 0.35 * glitchIntensity }}>
            <div style={{ width: "100%", height: "100%", border: "2px solid #0000FF" }} />
          </AbsoluteFill>
        </>
      )}

      {/* Displaced Bands */}
      <AbsoluteFill>
        {new Array(numBands).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${(i / numBands) * 100}%`,
              left: 0,
              width: "100%",
              height: `${100 / numBands}%`,
              transform: `translateX(${bands[i]}px)`,
              borderTop: glitchIntensity > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
              backgroundColor: glitchIntensity > 0.5 ? "rgba(201,168,76,0.05)" : "transparent",
            }}
          />
        ))}
      </AbsoluteFill>

      {/* Static Noise */}
      {points.map((p, i) => p.visible && (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: 2,
            height: 2,
            backgroundColor: "#FFF",
            opacity: 0.5,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
