import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { useMemo } from "react";

export const Clip14MG = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const drawProgress = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
    
    // Exponential spike path logic
    const path = useMemo(() => {
        let p = "M 0 1600 ";
        for (let i = 1; i <= 100; i++) {
            const x = (i / 100) * 1080;
            // Spikes violently upward at the end
            const y = 1600 - Math.pow(i / 100, 6) * 1300;
            p += `L ${x} ${y} `;
        }
        return p;
    }, []);

    const badgeSlam = spring({
        frame: frame - 35,
        fps,
        config: { damping: 10, stiffness: 200 }
    });

    const driftY = interpolate(frame, [0, durationInFrames], [0, 250]);
    const gridPan = (frame * 8) % 200;

    const exit = interpolate(frame, [durationInFrames - 12, durationInFrames], [0, 1], { extrapolateLeft: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#0A0A0A", overflow: "hidden" }}>
            {/* Moving Grid */}
            <AbsoluteFill style={{ opacity: 0.08, transform: `translateY(${driftY}px)` }}>
               {[...Array(25)].map((_, i) => (
                   <div key={i} style={{ position: "absolute", bottom: i * 200, left: -200, right: -200, height: 2, backgroundColor: "#FFF" }} />
               ))}
               {[...Array(12)].map((_, i) => (
                   <div key={i} style={{ position: "absolute", left: i * 200 - gridPan, top: -2000, bottom: 3000, width: 2, backgroundColor: "#FFF" }} />
               ))}
            </AbsoluteFill>

            {/* Chart Container */}
            <div style={{ transform: `translateY(${driftY - exit * 2000}px)`, width: "100%", height: "100%" }}>
                <svg width="1080" height="1920" viewBox="0 0 1080 1920">
                    <path
                        d={path}
                        fill="none"
                        stroke="#C9A84C"
                        strokeWidth="14"
                        strokeDasharray="5000"
                        strokeDashoffset={5000 * (1 - drawProgress)}
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 20px #C9A84C)" }}
                    />
                </svg>

                {/* Badge at the peak */}
                <div style={{
                    position: "absolute",
                    top: 250,
                    right: 80,
                    transform: `scale(${badgeSlam})`,
                    backgroundColor: "#FFF",
                    padding: "30px 50px",
                    borderRadius: 15,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                    border: "4px solid #C9A84C"
                }}>
                    <h3 style={{ margin: 0, fontSize: 100, fontWeight: 900, color: "#000", fontFamily: "Inter, sans-serif" }}>200%</h3>
                </div>
            </div>
        </AbsoluteFill>
    );
};
