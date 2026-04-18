import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { useMemo } from "react";

const ParticleDust = () => {
    const frame = useCurrentFrame();
    const particles = useMemo(() => {
        return new Array(40).fill(0).map((_, i) => ({
            x: Math.random() * 1080,
            y: Math.random() * 1920,
            size: Math.random() * 6 + 2,
            speed: Math.random() * 15 + 10
        }));
    }, []);

    const startFrame = 45;
    const progress = Math.max(0, frame - startFrame);

    return (
        <AbsoluteFill style={{ pointerEvents: "none" }}>
            {particles.map((p, i) => (
                <div key={i} style={{
                    position: "absolute",
                    left: p.x + progress * p.speed,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                    backgroundColor: "#C9A84C",
                    borderRadius: "50%",
                    opacity: interpolate(progress, [0, 30], [0, 0.7], { extrapolateRight: "clamp" })
                }} />
            ))}
        </AbsoluteFill>
    );
};

export const Clip12MG = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const lineStrike = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 200 }
    });

    const split = spring({
        frame: frame - 15,
        fps,
        config: { damping: 12, stiffness: 100 }
    });

    const dissolve = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
            <AbsoluteFill style={{ opacity: dissolve }}>
                {/* Left Panel */}
                <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "50%",
                    backgroundColor: "#0A0A0A",
                    transform: `translateX(${-split * 150}px)`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "3px solid #C9A84C",
                    boxShadow: "10px 0 30px rgba(0,0,0,0.5)"
                }}>
                    <h2 style={{ color: "#F00", fontSize: 180, fontWeight: 900, textShadow: "0 0 20px rgba(255,0,0,0.4)" }}>0%</h2>
                </div>

                {/* Right Panel */}
                <div style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: "50%",
                    backgroundColor: "#0A0A0A",
                    transform: `translateX(${split * 150}px)`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeft: "3px solid #C9A84C",
                    boxShadow: "-10px 0 30px rgba(0,0,0,0.5)"
                }}>
                    <div style={{ 
                        width: 350, 
                        height: 500, 
                        border: "3px solid #FFF", 
                        opacity: 0.3,
                        display: "flex",
                        flexDirection: "column",
                        padding: 20
                    }}>
                        <div style={{ width: "100%", height: "30%", border: "2px solid #FFF", marginBottom: 20 }} />
                        <div style={{ width: "80%", height: "2px", backgroundColor: "#FFF", marginBottom: 10 }} />
                        <div style={{ width: "60%", height: "2px", backgroundColor: "#FFF", marginBottom: 10 }} />
                    </div>
                </div>

                {/* Strike Line */}
                <div style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    bottom: 0,
                    width: 8,
                    backgroundColor: "#C9A84C",
                    transform: `scaleY(${lineStrike})`,
                    marginLeft: -4,
                    boxShadow: "0 0 30px #C9A84C",
                    zIndex: 10
                }} />
            </AbsoluteFill>

            <ParticleDust />
        </AbsoluteFill>
    );
};
