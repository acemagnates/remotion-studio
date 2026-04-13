import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const Clip16_EliminatingCompetition = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = frame / 150;
    
    const scale = interpolate(progress, [0, 1], [0.95, 1], {
        easing: Easing.bezier(0.33, 1, 0.68, 1),
    });

    const opacity = interpolate(frame, [0, 40], [0, 1]);

    return (
        <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
             <AbsoluteFill
                style={{
                    backdropFilter: "blur(24px) brightness(0.5)",
                    backgroundColor: "rgba(10, 10, 10, 0.6)",
                }}
            />
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 60 }}>
                <h1
                    style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: 100,
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: 1.2,
                        textTransform: "uppercase",
                        letterSpacing: 10,
                        transform: `scale(${scale})`,
                        opacity,
                        textShadow: "0px 0px 15px rgba(255, 255, 255, 0.4)",
                    }}
                >
                    ELIMINATING<br/>COMPETITION
                </h1>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
