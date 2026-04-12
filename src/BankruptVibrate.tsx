import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const BankruptVibrate = () => {
    const frame = useCurrentFrame();

    // Vibrate violently for 0.2s (12 frames)
    let translateX = 0;
    let translateY = 0;

    if (frame < 12) {
        // High frequency random movement
        translateX = (Math.random() - 0.5) * 40;
        translateY = (Math.random() - 0.5) * 40;
    }

    const opacity = interpolate(frame, [0, 1], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <h1
                style={{
                    color: 'white',
                    fontSize: 140,
                    fontFamily: 'serif',
                    fontWeight: 100,
                    letterSpacing: '100px', // Heavily tracked out
                    margin: 0,
                    marginLeft: '100px', // Compensate for tracking on the right
                    textAlign: 'center',
                    transform: `translate(${translateX}px, ${translateY}px)`,
                    opacity,
                    textShadow: '0 0 30px rgba(255,255,255,0.4)',
                }}
            >
                BANKRUPT
            </h1>
        </AbsoluteFill>
    );
};
