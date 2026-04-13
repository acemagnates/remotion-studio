import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip10_UnbreakableMonopoly = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slamProgress = spring({
        frame,
        fps,
        config: {
            damping: 15,
            stiffness: 100,
            mass: 2,
        },
    });

    const scale = interpolate(slamProgress, [0, 1], [4, 1]);
    const opacity = interpolate(frame, [0, 5], [0, 1]);

    // Background darkening on impact
    const impactFrame = 12;
    const bgDarkness = interpolate(frame, [impactFrame, impactFrame + 2, impactFrame + 10], [0.6, 0.9, 0.6]);

    return (
        <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
             {/* Obsidian Plates Background */}
             <AbsoluteFill style={{ 
                 backgroundColor: `rgba(10, 10, 10, ${bgDarkness})`,
                 backgroundImage: "linear-gradient(45deg, #0A0A0A 25%, #111 25%, #111 50%, #0A0A0A 50%, #0A0A0A 75%, #111 75%, #111 100%)",
                 backgroundSize: "100px 100px"
             }} />

            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 40 }}>
                <h1
                    style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: 120,
                        color: "white",
                        fontWeight: 900,
                        textAlign: "center",
                        lineHeight: 1.1,
                        margin: 0,
                        transform: `scale(${scale})`,
                        opacity,
                        textShadow: `
                            0px 0px 20px rgba(255, 255, 255, 0.2),
                            10px 10px 30px rgba(0, 0, 0, 0.8)
                        `,
                    }}
                >
                    UNBREAKABLE MONOPOLY
                </h1>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
