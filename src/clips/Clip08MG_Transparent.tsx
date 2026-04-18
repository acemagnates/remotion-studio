import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Clip08MG_Transparent = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    
    const text = "ACTION = ZERO";
    const charsToShow = Math.floor(interpolate(frame, [0, 15], [0, text.length], { extrapolateRight: "clamp" }));
    const cursorVisible = Math.floor(frame / 8) % 2 === 0;

    const drift = interpolate(frame, [0, durationInFrames], [1, 1.05]);
    const exitProgress = interpolate(frame, [durationInFrames - 12, durationInFrames], [0, 1], { extrapolateLeft: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#00FF00", justifyContent: "center", alignItems: "center" }}>
            <div style={{
                transform: `scale(${drift})`,
                opacity: 1 - exitProgress,
                position: "relative"
            }}>
                <h1 style={{
                    color: "#FFF",
                    fontSize: 160,
                    fontWeight: 900,
                    fontFamily: "monospace",
                    textShadow: "0 0 25px rgba(201,168,76,0.7), 0 0 50px rgba(201,168,76,0.3)",
                    letterSpacing: "0.1em",
                    margin: 0
                }}>
                    {text.slice(0, charsToShow)}
                    {charsToShow < text.length || cursorVisible ? "_" : ""}
                </h1>

                {/* Faint CRT Flicker */}
                <AbsoluteFill style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    opacity: Math.random() * 0.15,
                    pointerEvents: "none",
                    mixBlendMode: "overlay"
                }} />

                {/* Glitch Exit Slices */}
                {exitProgress > 0 && (
                    <AbsoluteFill style={{ pointerEvents: "none" }}>
                        {[...Array(10)].map((_, i) => (
                             <div key={i} style={{
                                position: "absolute",
                                top: `${i * 10}%`,
                                left: 0,
                                right: 0,
                                height: "10.1%",
                                backgroundColor: "#00FF00",
                                transform: `translateX(${(Math.random() - 0.5) * 100 * exitProgress}px)`,
                             }} />
                        ))}
                    </AbsoluteFill>
                )}
            </div>
        </AbsoluteFill>
    );
};
