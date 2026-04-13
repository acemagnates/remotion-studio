import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip03 = () => {
  const frame = useCurrentFrame();
  const { fps, width, durationInFrames } = useVideoConfig();

  // ACT 1: ENTRANCE (0-0.8s)
  const month4Entrance = spring({
    frame,
    fps,
    config: { damping: 20, mass: 1.5 }
  });
  const month4Y = interpolate(month4Entrance, [0, 1], [-50, 0]);

  const numberEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 20, mass: 1.5 }
  });
  const numberY = interpolate(numberEntrance, [0, 1], [100, 0]);

  const counter = Math.floor(interpolate(frame, [10, 60], [0, 340], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  }));

  const lineDraw = interpolate(frame, [20, 50], [0, 500], {
    extrapolateRight: "clamp"
  });

  // ACT 2: HOLD + EVOLUTION (0.8-2.0s)
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.04]);
  
  const totalEarnedOpacity = interpolate(frame, [60, 84], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });

  const angle = interpolate(frame, [0, durationInFrames], [0, Math.PI * 2]);
  const orbitX = Math.cos(angle) * 120;
  const orbitY = Math.sin(angle) * 60;

  // ACT 3: EXIT (2.0-2.5s)
  const exit = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp"
  });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: "#0A0A0A", 
      opacity: exit,
      fontFamily: "sans-serif",
      color: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        {/* MONTH 4 */}
        <div style={{ 
          color: "#C9A84C", 
          fontSize: 24, 
          letterSpacing: "0.2em",
          transform: `translateY(${month4Y}px)`,
          opacity: month4Entrance,
          marginBottom: 40
        }}>
          MONTH 4
        </div>

        {/* $340 */}
        <div style={{ 
          fontSize: width * 0.18, 
          fontWeight: 900,
          transform: `translateY(${numberY}px)`,
          opacity: numberEntrance,
          position: "relative"
        }}>
          ${counter}
          
          {/* Orbiting Particle */}
          <div style={{
            position: "absolute",
            width: 3,
            height: 3,
            backgroundColor: "#C9A84C",
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            transform: `translate(${orbitX}px, ${orbitY}px)`
          }} />
        </div>

        {/* Underline */}
        <div style={{ 
          width: lineDraw, 
          height: 1, 
          backgroundColor: "#C9A84C", 
          margin: "20px auto",
          opacity: 0.8
        }} />

        {/* total earned */}
        <div style={{ 
          color: "#888888", 
          fontSize: 18,
          opacity: totalEarnedOpacity
        }}>
          total earned
        </div>
      </div>
    </AbsoluteFill>
  );
};
