import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip20MG = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const words = ["SURVIVE", "THE", "DROUGHT"];

    const driftScale = interpolate(frame, [0, durationInFrames], [1, 1.15]);
    const bgPulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [0.15, 0.45]);

    return (
        <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
            {/* Background Radial Glow */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle at center, rgba(201,168,76,${bgPulse}) 0%, transparent 70%)`,
                opacity: 0.8
            }} />

            <AbsoluteFill style={{ 
                justifyContent: "center", 
                alignItems: "center", 
                flexDirection: "column", 
                transform: `scale(${driftScale})`,
                padding: 40
            }}>
                {words.map((w, i) => {
                    const entrance = spring({
                        frame: frame - (i * 10),
                        fps,
                        config: { damping: 9, stiffness: 180, mass: 1.4 }
                    });
                    return (
                        <h1 key={i} style={{
                            color: "#FFF",
                            fontSize: 160,
                            fontWeight: 900,
                            margin: 15,
                            fontFamily: "Inter, sans-serif",
                            transform: `scale(${entrance}) translateY(${interpolate(entrance, [0, 1], [150, 0])}px)`,
                            opacity: entrance,
                            textShadow: "0 0 40px rgba(255,255,255,0.5), 0 0 100px rgba(255,255,255,0.2)",
                            letterSpacing: "-0.02em"
                        }}>
                            {w}
                        </h1>
                    );
                })}
            </AbsoluteFill>

            {/* Final Fade Act 3 */}
            <AbsoluteFill style={{ 
                backgroundColor: "#000", 
                opacity: interpolate(frame, [durationInFrames - 12, durationInFrames], [0, 1], { extrapolateLeft: "clamp" }),
                pointerEvents: "none"
            }} />
        </AbsoluteFill>
    );
};
