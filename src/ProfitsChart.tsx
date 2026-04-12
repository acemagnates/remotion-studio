import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

const GOLD = '#C9A84C';
const OBSIDIAN = '#000000';

export const ProfitsChart = () => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    // Line drawing progress
    const drawProgress = interpolate(frame, [0, 60], [0, 100], {
        extrapolateRight: 'clamp',
    });

    // Chart points: initial jitter then violent shoot up
    // We'll generate a jagged line procedurally
    const points = Array.from({ length: 50 }).map((_, i) => {
        const x = (i / 49) * (width * 0.8) + (width * 0.1);
        let y = height * 0.6;
        
        if (i < 40) {
            // Jittery baseline
            y += Math.sin(i * 1.5) * 20 + Math.random() * 10;
        } else {
            // Violent shoot up (80 degree angle approx)
						// Delta Y / Delta X = tan(80 deg) approx 5.67
            const shootProgress = (i - 40) / 10;
            y -= shootProgress * 600;
        }
        return { x, y };
    });

    // Glass shatter effect at Apex (around frame 60)
    const apexReached = frame >= 60;
    const shatterProgress = interpolate(frame - 60, [0, 30], [0, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: OBSIDIAN }}>
            {/* Background Text */}
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                <h1
                    style={{
                        fontSize: 180,
                        color: 'white',
                        opacity: 0.1,
                        fontWeight: 900,
                        letterSpacing: '20px',
                        margin: 0,
                    }}
                >
                    PROFITS
                </h1>
            </AbsoluteFill>

            {/* SVG Chart */}
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                style={{ position: 'absolute' }}
            >
                <path
                    d={`M ${points[0].x} ${points[0].y} ` + points
                        .slice(1, Math.floor(interpolate(drawProgress, [0, 100], [0, 50])))
                        .map(p => `L ${p.x} ${p.y}`)
                        .join(' ')}
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        filter: `drop-shadow(0 0 15px ${GOLD}CC)`,
                    }}
                />
                
                {/* Apex Point Glow */}
                {apexReached && (
                    <circle
                        cx={points[points.length - 1].x}
                        cy={points[points.length - 1].y}
                        r={interpolate(shatterProgress, [0, 0.1, 1], [0, 30, 0])}
                        fill={GOLD}
                    />
                )}
            </svg>

            {/* Shatter shards */}
            {apexReached && Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2 + Math.random();
                const dist = interpolate(shatterProgress, [0, 1], [0, 400 + Math.random() * 200]);
                const shardX = points[points.length - 1].x + Math.cos(angle) * dist;
                const shardY = points[points.length - 1].y + Math.sin(angle) * dist;
                const rotate = shatterProgress * 360 * (i % 2 ? 1 : -1);

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: shardX,
                            top: shardY,
                            width: 10 + Math.random() * 20,
                            height: 2,
                            backgroundColor: GOLD,
                            transform: `rotate(${rotate}deg)`,
                            opacity: 1 - shatterProgress,
                            filter: `blur(${shatterProgress * 4}px)`,
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};
