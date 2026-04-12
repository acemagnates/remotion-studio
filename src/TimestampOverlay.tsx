import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

const GOLD = '#C9A84C';

export const TimestampOverlay = () => {
	const frame = useCurrentFrame();
	const text = 'TIME: 04:00 AM';
	
	// Type on: one character per frame
	const charsVisible = Math.floor(frame);
	const displayedText = text.slice(0, charsVisible);

	// Pulse effect: two 10% opacity increases after typing finishes
	// Typing finishes at frame 14
	const pulseStart = text.length;
	const pulse = interpolate(
		frame,
		[pulseStart, pulseStart + 15, pulseStart + 30, pulseStart + 45, pulseStart + 60],
		[1, 1.1, 1, 1.1, 1],
		{ extrapolateRight: 'clamp' }
	);

	return (
		<AbsoluteFill>
			<div
				style={{
					position: 'absolute',
					top: 100,
					left: 80,
					fontFamily: 'monospace',
					fontSize: 48,
					color: GOLD,
					fontWeight: 700,
					letterSpacing: '2px',
					textShadow: `0 0 15px ${GOLD}66`,
					opacity: pulse,
					filter: `brightness(${pulse})`,
				}}
			>
				{displayedText}
				{charsVisible < text.length && (
					<span style={{ opacity: frame % 10 < 5 ? 1 : 0 }}>_</span>
				)}
			</div>
		</AbsoluteFill>
	);
};
