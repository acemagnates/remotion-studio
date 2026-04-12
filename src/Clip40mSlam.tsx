import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from 'remotion';

const GOLD = '#C9A84C';
const OBSIDIAN = '#0A0A0A';

const Particle = ({ delay, index }: { delay: number; index: number }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const progress = spring({
		frame: frame - delay,
		fps,
		config: { damping: 50 },
	});

	if (frame < delay) return null;

	const angle = (index / 12) * Math.PI * 2;
	const distance = interpolate(progress, [0, 1], [50, 400]);
	const scale = interpolate(progress, [0, 1], [1, 0]);
	const opacity = interpolate(progress, [0, 0.2, 1], [0, 1, 0]);

	const x = Math.cos(angle) * distance;
	const y = Math.sin(angle) * distance;

	return (
		<div
			style={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				width: 8,
				height: 8,
				backgroundColor: GOLD,
				borderRadius: '50%',
				boxShadow: `0 0 10px ${GOLD}`,
				transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
				opacity,
			}}
		/>
	);
};

export const Clip40mSlam = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const slam = spring({
		frame,
		fps,
		config: {
			damping: 200,
			stiffness: 100,
			mass: 2,
		},
		durationInFrames: 30, // Land at 0.5s
	});

	const scale = interpolate(slam, [0, 1], [3, 1]);
	const opacity = interpolate(frame, [0, 5], [0, 1]);

	return (
		<AbsoluteFill style={{ backgroundColor: OBSIDIAN }}>
			<AbsoluteFill
				style={{
					backdropFilter: 'blur(24px)',
					backgroundColor: 'rgba(10, 10, 10, 0.5)',
				}}
			/>
			
			{/* Particle Burst at frame 30 */}
			<AbsoluteFill>
				{Array.from({ length: 12 }).map((_, i) => (
					<Particle key={i} index={i} delay={30} />
				))}
			</AbsoluteFill>

			<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
				<h1
					style={{
						color: 'white',
						fontSize: 160,
						fontFamily: 'system-ui, -apple-system, sans-serif',
						fontWeight: 900,
						margin: 0,
						padding: 40,
						textAlign: 'center',
						WebkitTextStroke: `2px ${GOLD}`,
						textShadow: `0 0 20px rgba(201, 168, 76, 0.4)`,
						transform: `scale(${scale})`,
						opacity,
					}}
				>
					$40 MILLION
				</h1>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
