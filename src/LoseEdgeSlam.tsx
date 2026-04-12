import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const LoseEdgeSlam = () => {
    const frame = useCurrentFrame();

    // Appears exactly at frame 60
    const isVisible = frame >= 60 && frame < 180;

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {isVisible && (
                <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <h1
                        style={{
                            color: 'white',
                            fontSize: 160,
                            fontFamily: 'system-ui',
                            fontWeight: 900,
                            textAlign: 'center',
                            lineHeight: 1,
                            margin: 0,
                            padding: '0 80px',
                            wordSpacing: '100vw', // Force one word per line if needed or just massive
                        }}
                    >
                        LOSE YOUR EDGE
                    </h1>
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
