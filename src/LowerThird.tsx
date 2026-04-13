import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const GOLD = "#C9A84C";
const OBSIDIAN = "rgba(10, 10, 10, 0.9)"; // Smoked obsidian glass
const WHITE = "#FFFFFF";

export const LowerThird = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width, height } = useVideoConfig();

	// ACT 1: ENTRANCE (0.5 - 1.0s)
	const entrance = spring({
		frame,
		fps,
		config: { damping: 12, stiffness: 200 },
	});

	// Gold line animation
	const lineGrow = interpolate(entrance, [0, 0.5], [0, 1], {
		extrapolateRight: "clamp",
	});
	const lineWidth = 4;
	const lineHeight = 120;

	// Panel slide
	const panelWidth = interpolate(entrance, [0.3, 1], [0, 600], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// Text slide
	const textX = interpolate(entrance, [0.4, 1], [-50, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const textOpacity = interpolate(entrance, [0.4, 0.8], [0, 1]);

	// ACT 2: HOLD + EVOLUTION (1.5 - 2.5s)
	const pulse = interpolate(
		Math.sin(frame * 0.1),
		[-1, 1],
		[0.8, 1]
	);

	// ACT 3: EXIT (0.3 - 0.5s)
	const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const containerStyle: React.CSSProperties = {
		position: "absolute",
		bottom: 150,
		left: 100,
		display: "flex",
		alignItems: "center",
		opacity: exit,
	};

	return (
		<AbsoluteFill>
			<div style={containerStyle}>
				{/* Gold Bevel Line */}
				<div style={{
					width: lineWidth,
					height: lineHeight * lineGrow,
					backgroundColor: GOLD,
					boxShadow: `0 0 15px ${GOLD}`,
					transition: "opacity 0.2s ease",
					opacity: pulse,
				}} />

				{/* Obsidian Glass Panel */}
				<div style={{
					height: lineHeight,
					width: panelWidth,
					backgroundColor: OBSIDIAN,
					border: `1px solid rgba(201, 168, 76, 0.3)`,
					borderLeft: "none",
					display: "flex",
					alignItems: "center",
					paddingLeft: 40,
					overflow: "hidden",
				}}>
					<div style={{
						color: WHITE,
						fontSize: 48,
						fontWeight: 900,
						fontFamily: "system-ui, sans-serif",
						letterSpacing: "0.1em",
						transform: `translateX(${textX}px)`,
						opacity: textOpacity,
						whiteSpace: "nowrap",
					}}>
						MAYOR VANCE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
