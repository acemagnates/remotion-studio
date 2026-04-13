import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const GOLD = "#C9A84C";
const OBSIDIAN = "#0A0A0A";
const WHITE = "#FFFFFF";

export const SplitReveal = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width, height } = useVideoConfig();

	// ACT 1: ENTRANCE (0.5 - 1.0s)
	const strike = spring({
		frame,
		fps,
		config: { damping: 12, stiffness: 200 },
	});

	// Gold line strike
	const lineY = interpolate(strike, [0, 0.5], [0, height], {
		extrapolateRight: "clamp",
	});

	// Split animation
	const split = spring({
		frame: frame - 15,
		fps,
		config: { damping: 20, stiffness: 100 },
	});

	// ACT 2: HOLD + EVOLUTION (1.5 - 2.5s)
	const drift = interpolate(frame, [0, durationInFrames], [0, 50]);
	
	const totalSplit = interpolate(split, [0, 1], [0, 200]) + drift;

	// ACT 3: EXIT (0.3 - 0.5s)
	const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill style={{ backgroundColor: "#000", opacity: exit }}>
			{/* Left Half */}
			<div style={{
				position: "absolute",
				width: "50%",
				height: "100%",
				left: 0,
				backgroundColor: OBSIDIAN,
				transform: `translateX(${-totalSplit}px)`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				borderRight: `1px solid ${GOLD}`,
			}}>
				<h2 style={{
					color: WHITE,
					fontSize: 80,
					fontWeight: 900,
					fontFamily: "system-ui, sans-serif",
					textAlign: "right",
					padding: 40,
				}}>
					40 TOWNS
				</h2>
			</div>

			{/* Right Half */}
			<div style={{
				position: "absolute",
				width: "50%",
				height: "100%",
				right: 0,
				backgroundColor: "#000",
				transform: `translateX(${totalSplit}px)`,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				borderLeft: `1px solid ${GOLD}`,
			}}>
				<h2 style={{
					color: GOLD,
					fontSize: 80,
					fontWeight: 900,
					fontFamily: "system-ui, sans-serif",
					textAlign: "left",
					padding: 40,
					textShadow: `0 0 20px rgba(201,168,76,0.6)`,
				}}>
					1 WINNER
				</h2>
			</div>

			{/* Glowing central line */}
			<div style={{
				position: "absolute",
				left: `calc(50% - 2px)`,
				top: 0,
				width: 4,
				height: lineY,
				backgroundColor: GOLD,
				boxShadow: `0 0 30px ${GOLD}`,
				zIndex: 10,
				transform: `scaleX(${interpolate(split, [0, 1], [1, 0.5])})`,
				opacity: interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0]),
			}} />
		</AbsoluteFill>
	);
};
