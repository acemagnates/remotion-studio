import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const PARTICLE_COUNT = 20;

export const Clip01_2018Slam = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Slam animation
    const slamProgress = spring({
        frame,
        fps,
        config: {
            damping: 12,
            mass: 0.5,
            stiffness: 100,
        },
    });

    const scale = interpolate(slamProgress, [0, 1], [3, 1]);
    const opacity = interpolate(frame, [0, 5], [0, 1]);

    // Background ripple/pulse on impact
    const impactFrame = 10;
    const rippleScale = spring({
        frame: frame - impactFrame,
        fps,
        config: { damping: 20 },
    });
    const rippleOpacity = interpolate(rippleScale, [0, 1], [0.5, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
            {/* Smoked glass overlay */}
            <AbsoluteFill
                style={{
                    backdropFilter: "blur(24px) brightness(0.5)",
                    backgroundColor: "rgba(10, 10, 10, 0.6)",
                    border: "1px solid #C9A84C",
                    margin: 20,
                    boxShadow: "0 0 20px rgba(201, 168, 76, 0.2)",
                }}
            />

            {/* Impact Ripple */}
            {frame >= impactFrame && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: 1000,
                        height: 1000,
                        transform: `translate(-50%, -50%) scale(${rippleScale * 2})`,
                        borderRadius: "50%",
                        border: "2px solid #C9A84C",
                        opacity: rippleOpacity,
                    }}
                />
            )}

            {/* Particles */}
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
                const startFrame = impactFrame;
                const particleProgress = (frame - startFrame) / (150 - startFrame);
                if (particleProgress < 0) return null;

                const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
                const velocity = 5 + (i % 5) * 2;
                const x = Math.cos(angle) * velocity * particleProgress * 200;
                const y = Math.sin(angle) * velocity * particleProgress * 200 + particleProgress * 300; // gravity

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: 6,
                            height: 6,
                            backgroundColor: "#C9A84C",
                            borderRadius: "50%",
                            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                            opacity: interpolate(particleProgress, [0, 0.8, 1], [1, 0.8, 0]),
                            boxShadow: "0 0 8px #C9A84C",
                        }}
                    />
                );
            })}

            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                <h1
                    style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: 280,
                        color: "white",
                        fontWeight: 900,
                        margin: 0,
                        transform: `scale(${scale})`,
                        opacity,
                        textShadow: `
                            0px 0px 20px rgba(255, 255, 255, 0.3),
                            0px 0px 40px rgba(201, 168, 76, 0.2)
                        `,
                    }}
                >
                    2018
                </h1>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
