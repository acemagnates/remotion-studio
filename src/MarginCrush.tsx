import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

const GOLD = '#C9A84C';
const OBSIDIAN = '#0A0A0A';

export const MarginCrush = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Crushing motion: 0.4s (24 frames)
	// We'll start it after a small delay (e.g. 10 frames)
	const crushProgress = interpolate(
		frame,
		[10, 34],
		[0, 1],
		{
			easing: Easing.bezier(0.33, 1, 0.68, 1),
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	const barWidth = interpolate(crushProgress, [0, 1], [80, 4]);

	// Text "4%" impact/scale up
	// Impacts right at frame 34
	const textScale = spring({
		frame: frame - 24,
		fps,
		config: {
			damping: 12,
			stiffness: 150,
		},
	});

	return (
		<AbsoluteFill style={{ backgroundColor: OBSIDIAN }}>
			<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ width: '80%', height: 120, position: 'relative' }}>
					{/* Progress Bar Container */}
					<div
						style={{
							width: '100%',
							height: 40,
							border: '1px solid rgba(255,255,255,0.1)',
							borderRadius: 4,
							overflow: 'hidden',
							backgroundColor: 'rgba(255,255,255,0.05)',
						}}
					>
						<div
							style={{
								width: `${barWidth}%`,
								height: '100%',
								backgroundColor: 'white',
								boxShadow: '0 0 20px rgba(255,255,255,0.3)',
							}}
						/>
					</div>

					{/* 4% Text */}
					<div
						style={{
							position: 'absolute',
							top: -100,
							left: '50%',
							transform: `translateX(-50%) scale(${textScale})`,
							color: GOLD,
							fontFamily: 'system-ui',
							fontSize: 120,
							fontWeight: 900,
							textShadow: `0 0 20px ${GOLD}66`,
							opacity: frame > 24 ? 1 : 0,
						}}
					>
						4%
					</div>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
