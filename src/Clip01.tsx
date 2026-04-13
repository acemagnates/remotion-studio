import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

export const Clip01 = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // ACT 1: ENTRANCE
  const entranceSpring = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const labelFade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  // Gold line path
  const linePath = `M 0 ${height / 2} L ${width} ${height / 2}`;
  const lineProgress = interpolate(frame, [0, 24], [0, 1], { 
    extrapolateLeft: "clamp", 
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1)
  });
  const { strokeDasharray, strokeDashoffset } = evolvePath(lineProgress, linePath);

  // ACT 2: COUNTER ROLL (47 -> 21)
  // Logic: Split 47 into 4 and 7, 21 into 2 and 1.
  // Or just roll the whole number if it's easier, but "digit strips" was requested.
  const rollProgress = interpolate(frame, [24, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp)
  });

  const getDigitRoll = (startDigit: number, endDigit: number, progress: number) => {
    const totalDigits = 10;
    // We want to scroll through a strip. 
    // If we go from 4 to 2, we might pass 3.
    // However, a roll usually goes through many numbers.
    const distance = (startDigit >= endDigit) ? (startDigit - endDigit) : (startDigit + 10 - endDigit);
    // Let's just do a simple vertical offset for the strip
    return progress * distance;
  };

  // ACT 3: EXIT
  const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

  // Numbers
  const renderDigitStrip = (start: number, end: number, progress: number) => {
    const digits = [];
    // For a 4 -> 2 roll, we show 4, 3, 2
    // If it's a "scrolling strip", we can just show a vertical stack
    const count = 5; // how many digits to show in the strip
    for (let i = 0; i < count; i++) {
        const val = (start - i + 10) % 10;
        digits.push(val);
    }
    
    const yOffset = interpolate(progress, [0, 1], [0, (start - end + (start < end ? 10 : 0)) * 200]);

    return (
      <div style={{ 
        position: "relative", 
        height: 200, 
        overflow: "hidden", 
        width: 120,
        display: "flex",
        justifyContent: "center"
      }}>
        <div style={{ 
            transform: `translateY(${-yOffset}px)`,
            display: "flex",
            flexDirection: "column"
        }}>
            {Array.from({length: 11}).map((_, i) => (
                <div key={i} style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {(start - i + 100) % 10}
                </div>
            ))}
        </div>
      </div>
    );
  };

  // Simplified Counter implementation as requested: "slicing a vertically scrolling number strip"
  const counterVal = interpolate(rollProgress, [0, 1], [47, 21]);
  const displayVal = Math.floor(counterVal);

  // Particles on lock
  const isLocked = frame >= 75;
  const particles = new Array(12).fill(0).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const pDist = interpolate(frame, [75, 90], [0, 150 * ((i % 3) + 1)], { extrapolateLeft: "clamp" });
    const pOp = interpolate(frame, [75, 90], [0.8, 0], { extrapolateLeft: "clamp" });
    return (
      <div key={i} style={{
        position: "absolute",
        width: (i % 3) + 3,
        height: (i % 3) + 3,
        backgroundColor: "#C9A84C",
        borderRadius: "50%",
        opacity: pOp * exit,
        transform: `translate(${Math.cos(angle) * pDist + width/2}px, ${Math.sin(angle) * pDist + height/2 - 100}px)`
      }} />
    );
  });

  const bloomGlow = isLocked ? "0 0 12px rgba(201,168,76,0.8), 0 4px 20px rgba(0,0,0,0.8)" : "none";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", opacity: exit }}>
      {/* Particles */}
      {particles}

      {/* Main Number */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: "-10%" }}>
        <div style={{ 
            fontSize: 480, 
            fontFamily: "Inter, sans-serif", 
            fontWeight: 900, 
            color: "#FFF",
            transform: `scale(${interpolate(entranceSpring, [0, 1], [1.2, 1]) * interpolate(frame, [0, durationInFrames], [1, 1.04])})`,
            textShadow: bloomGlow,
            display: "flex"
        }}>
            {/* Split roll for 47 -> 21 */}
            <div style={{ position: "relative", height: 500, overflow: "hidden" }}>
                 <div style={{ transform: `translateY(${-interpolate(rollProgress, [0, 1], [0, 400], { easing: Easing.out(Easing.exp)}) }px)` }}>
                    <div style={{ height: 500 }}>4</div>
                    <div style={{ height: 500 }}>3</div>
                    <div style={{ height: 500 }}>2</div>
                 </div>
            </div>
            <div style={{ position: "relative", height: 500, overflow: "hidden" }}>
                 <div style={{ transform: `translateY(${-interpolate(rollProgress, [0, 1], [0, 1200], { easing: Easing.out(Easing.exp)}) }px)` }}>
                    <div style={{ height: 500 }}>7</div>
                    <div style={{ height: 500 }}>6</div>
                    <div style={{ height: 500 }}>5</div>
                    <div style={{ height: 500 }}>4</div>
                    <div style={{ height: 500 }}>3</div>
                    <div style={{ height: 500 }}>2</div>
                    <div style={{ height: 500 }}>1</div>
                 </div>
            </div>
        </div>
      </AbsoluteFill>

      {/* Divider line */}
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <path 
            d={linePath} 
            stroke="#C9A84C" 
            strokeWidth="1" 
            fill="none" 
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Label */}
      <div style={{
        position: "absolute",
        top: "55%",
        width: "100%",
        textAlign: "center",
        color: "#C9A84C",
        fontFamily: "Inter, sans-serif",
        fontSize: 42,
        fontWeight: 400,
        letterSpacing: "0.4em",
        opacity: labelFade
      }}>
        MEETINGS DELETED
      </div>
    </AbsoluteFill>
  );
};
