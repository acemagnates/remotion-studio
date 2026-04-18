import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip10MG = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const crackProgress = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 100 }
    });

    const textReveal = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15, stiffness: 80 }
    });

    const drift = interpolate(frame, [0, durationInFrames], [1, 1.15]);
    
    // ACT 3 EXIT
    const exit = spring({
        frame: frame - (durationInFrames - 15),
        fps,
        config: { damping: 20, stiffness: 100 }
    });

    const pushScale = interpolate(exit, [0, 1], [1, 12]);
    const pushOpacity = interpolate(exit, [0.4, 0.8], [1, 0], { extrapolateLeft: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#0A0A0A", overflow: "hidden" }}>
            <AbsoluteFill style={{ 
                transform: `scale(${pushScale})`, 
                opacity: pushOpacity,
                justifyContent: "center", 
                alignItems: "center" 
            }}>
                <h1 style={{
                    color: "#FFF",
                    fontSize: 140,
                    fontWeight: 900,
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                    transform: `scale(${drift * textReveal})`,
                    textShadow: "0 0 40px rgba(201,168,76,0.9), 0 0 80px rgba(201,168,76,0.4)",
                    margin: 0,
                    opacity: textReveal
                }}>
                    THE ROOT<br/>SYSTEM
                </h1>

                {/* Fracture Panels */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "50%",
                    height: "100%",
                    backgroundColor: "#0A0A0A",
                    transform: `translateX(${-crackProgress * 100}%)`,
                    borderRight: "6px solid #C9A84C",
                    boxShadow: "10px 0 30px rgba(201,168,76,0.5)"
                }} />
                <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "50%",
                    height: "100%",
                    backgroundColor: "#0A0A0A",
                    transform: `translateX(${crackProgress * 100}%)`,
                    borderLeft: "6px solid #C9A84C",
                    boxShadow: "-10px 0 30px rgba(201,168,76,0.5)"
                }} />
            </AbsoluteFill>

            {/* Final Bloom Bloom */}
            <AbsoluteFill style={{ 
                backgroundColor: "#FFF", 
                opacity: interpolate(exit, [0.6, 1], [0, 1]),
                pointerEvents: "none"
            }} />
        </AbsoluteFill>
    );
};
