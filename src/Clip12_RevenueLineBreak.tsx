import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const Clip12_RevenueLineBreak = () => {
    const frame = useCurrentFrame();
    const { width, height, fps } = useVideoConfig();

    const breakFrame = 60;
    
    // Normal growth before break
    const normalProgress = Math.min(frame / breakFrame, 1);
    
    // Crash progression after break
    const crashFrame = frame - breakFrame;
    const crashProgress = Math.max(0, crashFrame / 40);
    const crashEasing = Easing.in(Easing.exp);
    const crashValue = crashEasing(crashProgress);

    const points = [];
    const segments = 20;

    for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        let y = height * 0.4 - (i / segments) * 200; // Growing line

        if (frame > breakFrame) {
            const breakIndex = Math.floor(breakFrame / (150 / segments));
            if (i >= breakIndex) {
               // After break point, plummeted
               y = y + crashValue * height * 0.8;
            }
        }
        points.push(`${x},${y}`);
    }

    const pathData = `M ${points.join(" L ")}`;

    // Flicker effect on crash
    const opacity = frame > breakFrame + 40 ? (Math.random() > 0.5 ? 1 : 0.3) : 1;

    return (
        <AbsoluteFill style={{ backgroundColor: "black" }}>
            {/* Grid */}
            <AbsoluteFill style={{ opacity: 0.1, backgroundImage: "linear-gradient(rgba(201, 168, 76, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.3) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <path
                    d={pathData}
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={opacity}
                    style={{
                        filter: "drop-shadow(0px 0px 15px rgba(201, 168, 76, 0.8))",
                    }}
                />
            </svg>

            <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "flex-start", padding: 60 }}>
                <h2 style={{ color: "white", fontFamily: "monospace", fontSize: 40, opacity: 0.5 }}>REVENUE_TRACKER</h2>
            </AbsoluteFill>

            {frame > breakFrame + 35 && (
                 <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                    <div style={{ color: "red", fontFamily: "monospace", fontSize: 100, fontWeight: "bold", border: "5px solid red", padding: "20px 40px", transform: "rotate(-10deg)", opacity: opacity }}>
                        SYSTEM_FAILURE
                    </div>
                 </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
