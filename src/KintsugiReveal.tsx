import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const GOLD = '#C9A84C';

export const KintsugiReveal = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Crack animation
    const crackProgress = spring({
        frame,
        fps,
        config: {
            damping: 200,
            stiffness: 100,
        },
    });

    // Reveal animation
    const revealProgress = spring({
        frame: frame - 10,
        fps,
        config: {
            damping: 200,
            stiffness: 100,
        },
    });

    const crackWidth = interpolate(crackProgress, [0, 1], [0, width]);
    const splitOffset = interpolate(revealProgress, [0, 1], [0, 100]);
		const textOpacity = interpolate(revealProgress, [0, 0.2], [0, 1]);

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            {/* The crack line */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: crackWidth,
                    height: 4,
                    backgroundColor: GOLD,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: `0 0 20px ${GOLD}`,
                    zIndex: 2,
                }}
            />

            {/* Top half text */}
            <div
                style={{
                    position: 'absolute',
                    top: `calc(50% - ${splitOffset}px)`,
                    left: '50%',
                    transform: `translate(-50%, -100%)`,
                    clipPath: `inset(0 0 0 0)`,
                    paddingBottom: 10,
										opacity: textOpacity,
                }}
            >
                <h1
                    style={{
                        color: GOLD,
                        fontSize: 120,
                        fontFamily: 'system-ui',
                        fontWeight: 900,
                        margin: 0,
                        textAlign: 'center',
                    }}
                >
                    USEFUL
                </h1>
            </div>

            {/* Bottom half text */}
            <div
                style={{
                    position: 'absolute',
                    top: `calc(50% + ${splitOffset}px)`,
                    left: '50%',
                    transform: `translate(-50%, 0)`,
                    clipPath: `inset(0 0 0 0)`,
                    paddingTop: 10,
										opacity: textOpacity,
                }}
            >
                <h1
                    style={{
                        color: GOLD,
                        fontSize: 120,
                        fontFamily: 'system-ui',
                        fontWeight: 900,
                        margin: 0,
                        textAlign: 'center',
                    }}
                >
                    ENEMY
                </h1>
            </div>
        </AbsoluteFill>
    );
};
