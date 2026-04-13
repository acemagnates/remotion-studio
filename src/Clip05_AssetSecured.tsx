import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const Clip05_AssetSecured = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const slideProgress = spring({
        frame,
        fps,
        config: {
            damping: 15,
            stiffness: 120,
            mass: 0.8,
        },
    });

    const xOffset = interpolate(slideProgress, [0, 1], [-1000, 0]);

    return (
        <AbsoluteFill>
            <div
                style={{
                    position: "absolute",
                    bottom: 200,
                    left: 0,
                    width: 700,
                    height: 120,
                    backgroundColor: "#0A0A0A",
                    borderTop: "2px solid #C9A84C",
                    transform: `translateX(${xOffset}px)`,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 60,
                    boxShadow: "0px 0px 20px rgba(201, 168, 76, 0.4)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <span
                    style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: 48,
                        color: "white",
                        fontWeight: "bold",
                        letterSpacing: 4,
                        textShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)",
                    }}
                >
                    ASSET SECURED
                </span>
            </div>
        </AbsoluteFill>
    );
};
