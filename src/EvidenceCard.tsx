import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const GOLD = "#C9A84C";
const OBSIDIAN = "rgba(10, 10, 10, 0.95)";
const WHITE = "#FFFFFF";

export const EvidenceCard = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width, height } = useVideoConfig();

	// ACT 1: ENTRANCE (0 - 1.0s)
	const entrance = spring({
		frame,
		fps,
		config: { damping: 15, stiffness: 150 },
	});

	const cardY = interpolate(entrance, [0, 1], [400, 0]);

	// ACT 2: HOLD + EVOLUTION (1.5 - 2.5s)
	const fullText = "0% TAX REVENUE FOR 10 YEARS";
	const typingProgress = interpolate(frame, [30, 90], [0, fullText.length], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const visibleText = fullText.substring(0, Math.floor(typingProgress));

	const scale = interpolate(frame, [0, durationInFrames], [1, 1.03]);

	// ACT 3: EXIT (0.3 - 0.5s)
	const exit = spring({
		frame: frame - (durationInFrames - 30),
		fps,
		config: { damping: 15, stiffness: 150 },
	});
	const exitY = interpolate(exit, [0, 1], [0, 600]);

	return (
		<AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
			<div style={{
				width: 800,
				height: 400,
				backgroundColor: OBSIDIAN,
				borderRadius: 8,
				border: `1px solid rgba(201, 168, 76, 0.4)`,
				boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.1)`,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: 60,
				transform: `translateY(${cardY + exitY}px) scale(${scale})`,
				position: "relative",
				overflow: "hidden",
			}}>
				{/* Scanning light line */}
				<div style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: 2,
					background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
					opacity: 0.4,
					transform: `translateY(${interpolate(frame % 60, [0, 60], [0, 400])}px)`,
				}} />

				<h3 style={{
					color: GOLD,
					fontSize: 24,
					fontWeight: 600,
					letterSpacing: "0.4em",
					margin: "0 0 30px 0",
					opacity: 0.7,
				}}>
					EVIDENCE CARD // CLASSIFIED
				</h3>

				<div style={{
					color: WHITE,
					fontSize: 54,
					fontWeight: 900,
					fontFamily: "system-ui, sans-serif",
					textAlign: "center",
					lineHeight: 1.2,
					textShadow: `0 0 15px rgba(255,255,255,0.2)`,
				}}>
					{visibleText}
				</div>
			</div>
		</AbsoluteFill>
	);
};
