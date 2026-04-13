import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip09_CashPop = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const popProgress = spring({
        frame,
        fps,
        config: {
            damping: 10,
            stiffness: 150,
            mass: 0.6,
        },
    });

    const scale = interpolate(popProgress, [0, 1], [0, 1]);
    const bounceScale = interpolate(popProgress, [0.8, 1], [1.2, 1], { extrapolateLeft: "clamp" });

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <h1
                style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: 300,
                    color: "white",
                    fontWeight: 900,
                    transform: `scale(${scale * bounceScale})`,
                    textShadow: "0px 0px 30px rgba(255, 255, 255, 0.4)",
                    margin: 0,
                }}
            >
                $$$
            </h1>
        </AbsoluteFill>
    );
};
