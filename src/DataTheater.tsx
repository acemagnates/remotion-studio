import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const GOLD = "#C9A84C";
const OBSIDIAN = "#0A0A0A";
const WHITE = "#FFFFFF";

export const DataTheater = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// ACT 1: ENTRANCE (0 - 1.0s)
	const barGrow = spring({
		frame,
		fps,
		config: { damping: 12, stiffness: 150 },
	});

	const barHeight = interpolate(barGrow, [0, 1], [0, 1200]);

	// ACT 2: HOLD + EVOLUTION
	const shimmer = interpolate(frame % 90, [0, 90], [-500, 1500]);
	const gradientShift = interpolate(Math.sin(frame * 0.05), [-1, 1], [40, 60]);

	// ACT 3: EXIT
	const exit = spring({
		frame: frame - (durationInFrames - 25),
		fps,
		config: { damping: 20, stiffness: 100 },
	});
	const slideDown = interpolate(exit, [0, 1], [0, 2000]);

	return (
		<AbsoluteFill style={{ 
			background: `radial-gradient(circle at 50% ${gradientShift}%, rgba(30,25,15,1) 0%, rgba(5,5,5,1) 60%, rgba(0,0,0,1) 100%)`,
			justifyContent: "center",
			alignItems: "center",
			transform: `translateY(${slideDown}px)`,
		}}>
			<div style={{
				width: 800,
				height: 1400,
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-end",
				alignItems: "center",
				position: "relative",
			}}>
				{/* Axis labels */}
				<div style={{
					position: "absolute",
					left: -100,
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					color: "rgba(255,255,255,0.3)",
					fontFamily: "monospace",
					fontSize: 24,
				}}>
					<span>100%</span>
					<span>80%</span>
					<span>60%</span>
					<span>40%</span>
					<span>20%</span>
					<span>0%</span>
				</div>

				{/* The Bar */}
				<div style={{
					width: 300,
					height: barHeight,
					backgroundColor: GOLD,
					position: "relative",
					overflow: "hidden",
					boxShadow: `0 0 50px rgba(201, 168, 76, 0.5)`,
				}}>
					{/* Continuous shimmer */}
					<div style={{
						position: "absolute",
						top: shimmer,
						left: 0,
						width: "100%",
						height: 200,
						background: `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.4), rgba(255,255,255,0))`,
						transform: `skewY(-20deg)`,
					}} />
				</div>

				{/* Label */}
				<div style={{
					marginTop: 60,
					textAlign: "center",
					opacity: barGrow,
				}}>
					<h2 style={{
						color: WHITE,
						fontSize: 48,
						fontWeight: 900,
						fontFamily: "system-ui, sans-serif",
						margin: 0,
					}}>
						WATER SUPPLY CONSUMED: 80%
					</h2>
					<div style={{
						height: 2,
						width: 400,
						backgroundColor: GOLD,
						margin: "20px auto",
						opacity: 0.5,
					}} />
				</div>
			</div>
		</AbsoluteFill>
	);
};
