import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const Clip20_MaintenanceDrop = () => {
    const frame = useCurrentFrame();
    const { fps, height } = useVideoConfig();

    const impactFrame = 30;
    
    // Falling animation
    const fallProgress = Math.min(frame / impactFrame, 1);
    const fallEasing = Easing.in(Easing.poly(4));
    
    const yOffset = frame < impactFrame 
        ? interpolate(fallEasing(fallProgress), [0, 1], [-height, 0])
        : 0;

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <div
                style={{
                    transform: `translateY(${yOffset}px)`,
                    padding: "40px 80px",
                    backgroundColor: "rgba(10, 10, 10, 0.9)",
                    border: "4px solid white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 30px 60px rgba(0, 0, 0, 0.8)",
                }}
            >
                <h1
                    style={{
                        fontFamily: "Arial Black, sans-serif",
                        fontSize: 80,
                        color: "white",
                        fontWeight: 900,
                        textAlign: "center",
                        margin: 0,
                        letterSpacing: -2,
                        textShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)",
                    }}
                >
                    PAY FOR THE<br/>MAINTENANCE
                </h1>
            </div>
        </AbsoluteFill>
    );
};
