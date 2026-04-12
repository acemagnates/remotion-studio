import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

const GOLD = '#C9A84C';

const DustParticle = ({ index }: { index: number }) => {
    const frame = useCurrentFrame();
    const { height } = useVideoConfig();
    
    // MICRO motion: very slow drift
    const startY = (index * 137) % height;
    const startX = (index * 265) % 1080;
    const speed = 0.2 + (index % 5) * 0.1;
    
    const y = startY - frame * speed;
    const x = startX + Math.sin(frame * 0.01 + index) * 20;
    const opacity = interpolate(Math.sin(frame * 0.02 + index), [-1, 1], [0.1, 0.4]);

    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 4 + (index % 8),
                height: 4 + (index % 8),
                backgroundColor: GOLD,
                borderRadius: '50%',
                filter: 'blur(4px)',
                opacity,
            }}
        />
    );
};

export const ZeroResistance = () => {
    const frame = useCurrentFrame();

    const textOpacity = interpolate(frame, [0, 90], [0, 1], {
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill>
            {/* Gold Dust Particles */}
            <AbsoluteFill>
                {Array.from({ length: 40 }).map((_, i) => (
                    <DustParticle key={i} index={i} />
                ))}
            </AbsoluteFill>

            {/* Bottom Center Text */}
            <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 200 }}>
                <h3
                    style={{
                        color: 'white',
                        fontFamily: 'system-ui',
                        fontSize: 64,
                        fontWeight: 300,
                        letterSpacing: '12px',
                        textTransform: 'uppercase',
                        opacity: textOpacity,
                    }}
                >
                    ZERO RESISTANCE
                </h3>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
