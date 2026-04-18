import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { useMemo } from "react";

const Shard = ({ id, delay }: { id: number; delay: number }) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const entrance = spring({
        frame: frame - delay,
        fps,
        config: { damping: 10, stiffness: 200 },
    });

    const angle = (id * 45) * (Math.PI / 180);
    const distance = interpolate(entrance, [0, 1], [0, 800 + Math.random() * 400]);

    // Slow drift in Act 2
    const drift = interpolate(frame, [20, durationInFrames], [0, 100]);

    const rotateX = interpolate(entrance, [0, 1], [0, Math.random() * 720]);
    const rotateY = interpolate(entrance, [0, 1], [0, Math.random() * 720]);

    const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 100 + Math.random() * 100,
                height: 100 + Math.random() * 100,
                backgroundColor: "#222",
                border: "1px solid #444",
                clipPath: "polygon(0% 0%, 100% 20%, 80% 100%, 10% 80%)",
                transform: `
          translate(-50%, -50%)
          translate(${Math.cos(angle) * (distance + drift)}px, ${Math.sin(angle) * (distance + drift)}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(${exit})
        `,
                opacity: exit,
                boxShadow: "0 0 10px rgba(0,0,0,0.5)"
            }}
        />
    );
};

export const Clip14MG = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.6, 1]);
    const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#0A0A0A", perspective: 1000 }}>
            {/* Target X in background */}
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                <h1
                    style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: 500,
                        color: "#FF0000",
                        margin: 0,
                        opacity: pulse * 0.8 * exit,
                        textShadow: "0 0 40px rgba(255,0,0,0.6)",
                        transform: `scale(${1 + frame / 300})`,
                    }}
                >
                    X
                </h1>
            </AbsoluteFill>

            {/* Shards */}
            {new Array(16).fill(0).map((_, i) => (
                <Shard key={i} id={i} delay={i * 1} />
            ))}
        </AbsoluteFill>
    );
};
