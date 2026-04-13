import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

export const Clip14_400PercentFlash = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const flashSpring = spring({
        frame,
        fps,
        config: {
            damping: 10,
            stiffness: 200,
            mass: 0.5,
        },
    });

    // Flash scale
    const scale = interpolate(flashSpring, [0, 1], [0.5, 1.2]);
    
    // Pulses
    const pulse1 = spring({ frame: frame - 25, fps, config: { damping: 10 } });
    const pulse2 = spring({ frame: frame - 50, fps, config: { damping: 10 } });
    const extraScale = interpolate(pulse1, [0, 0.5, 1], [0, 0.2, 0]) + interpolate(pulse2, [0, 0.5, 1], [0, 0.2, 0]);

    // Fading out
    const opacity = interpolate(frame, [120, 150], [1, 0], { extrapolateLeft: "clamp" });

    // Violent flicker at start
    const flicker = frame < 10 ? (Math.random() > 0.5 ? 1 : 0) : 1;

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: opacity * flicker }}>
            <h1
                style={{
                    fontFamily: "Arial Black, sans-serif",
                    fontSize: 400,
                    fontWeight: 900,
                    margin: 0,
                    color: "red",
                    textShadow: `
                        0px 0px 40px rgba(255, 0, 0, 0.8),
                        0px 0px 80px rgba(201, 168, 76, 0.6)
                    `,
                    WebkitTextStroke: "4px #C9A84C",
                    transform: `scale(${scale + extraScale})`,
                }}
            >
                400%
            </h1>
        </AbsoluteFill>
    );
};
