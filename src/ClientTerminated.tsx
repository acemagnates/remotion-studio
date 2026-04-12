import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

const GOLD = '#C9A84C';
const OBSIDIAN = 'rgba(10, 10, 10, 0.8)';

export const ClientTerminated = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 20,
			stiffness: 100,
			mass: 0.5,
		},
		durationInFrames: 18, // Snap at 0.3s
	});

	const slideX = interpolate(entrance, [0, 1], [-1000, 0]);

	return (
		<AbsoluteFill>
			<div
				style={{
					position: 'absolute',
					bottom: 400,
					left: 100,
					width: 880,
					height: 180,
					backgroundColor: OBSIDIAN,
					borderLeft: `4px solid ${GOLD}`,
					backdropFilter: 'blur(12px)',
					display: 'flex',
					alignItems: 'center',
					paddingLeft: 40,
					transform: `translateX(${slideX}px)`,
					boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
				}}
			>
				<h2
					style={{
						color: 'white',
						fontSize: 60,
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '4px',
						margin: 0,
					}}
				>
					CLIENT #01: <span style={{ color: GOLD }}>TERMINATED</span>
				</h2>
			</div>
		</AbsoluteFill>
	);
};
