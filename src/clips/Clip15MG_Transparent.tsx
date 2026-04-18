import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip15MG_Transparent = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const slam = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 180, mass: 1.2 }
    });

    const text = "LIQUIDATED";
    const typeProgress = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const charsToShow = Math.floor(typeProgress * text.length);

    const driftScale = interpolate(frame, [0, durationInFrames], [1, 1.04]);
    const driftRotateY = interpolate(frame, [0, durationInFrames], [-8, 8]);

    const exit = spring({
        frame: frame - (durationInFrames - 15),
        fps,
        config: { damping: 15, stiffness: 220 }
    });

    return (
        <AbsoluteFill style={{ backgroundColor: "#00FF00", perspective: 1200, justifyContent: "center", alignItems: "center" }}>
            <div style={{
                width: "80%",
                height: 1000,
                backgroundColor: "#FFF",
                border: "6px solid #C9A84C",
                borderRadius: 25,
                display: "flex",
                flexDirection: "column",
                padding: 80,
                boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                transform: `translateY(${interpolate(slam, [0, 1], [1500, 0]) + exit * 2000}px) scale(${driftScale}) rotateY(${driftRotateY}deg)`,
                opacity: 1 - exit * 0.5
            }}>
                <div style={{ 
                    borderBottom: "3px solid #EEE", 
                    paddingBottom: 30, 
                    marginBottom: 60,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <div style={{ width: 140, height: 24, backgroundColor: "#F0F0F0" }} />
                    <div style={{ width: 80, height: 24, backgroundColor: "#F0F0F0" }} />
                </div>
                
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h2 style={{
                        color: "#E63946",
                        fontSize: 140,
                        fontWeight: 900,
                        margin: 0,
                        fontFamily: "monospace",
                        textAlign: "center",
                        letterSpacing: "-0.02em",
                        transform: "rotate(-5deg)",
                        border: "10px solid #E63946",
                        padding: "20px 40px",
                        opacity: charsToShow > 0 ? 1 : 0
                    }}>
                        {text.slice(0, charsToShow)}
                    </h2>
                </div>

                <div style={{ marginTop: 60, borderTop: "3px solid #EEE", paddingTop: 40 }}>
                    <div style={{ width: "100%", height: 20, backgroundColor: "#F9F9F9", marginBottom: 15 }} />
                    <div style={{ width: "70%", height: 20, backgroundColor: "#F9F9F9" }} />
                </div>
            </div>
        </AbsoluteFill>
    );
};
