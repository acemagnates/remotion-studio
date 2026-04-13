import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

const GOLD = "#C9A84C";
const OBSIDIAN = "#0A0A0A";
const WHITE = "#FFFFFF";

export const KintsugiReveal = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width, height } = useVideoConfig();

	// ACT 1: ENTRANCE (Fracture growth)
	const growth = spring({
		frame,
		fps,
		config: { damping: 20, stiffness: 100 },
	});

	// SVG Path for fracture lines (Organic branches)
	const path1 = "M 540 960 L 580 900 L 520 840 L 560 780";
	const path2 = "M 540 960 L 500 1020 L 560 1080 L 520 1140";
	const path3 = "M 540 960 L 650 980 L 720 920";
	const path4 = "M 540 960 L 430 940 L 360 1000";

	const evolved1 = evolvePath(growth, path1);
	const evolved2 = evolvePath(growth, path2);
	const evolved3 = evolvePath(growth, path3);
	const evolved4 = evolvePath(growth, path4);

	// Panel shift
	const shift = spring({
		frame: frame - 25,
		fps,
		config: { damping: 15, stiffness: 50 },
	});

	// ACT 2: HOLD + EVOLUTION
	const drift = interpolate(frame, [0, durationInFrames], [0, 10]);
	const brightness = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.8, 1.2]);

	const totalShift = interpolate(shift, [0, 1], [0, 40]) + drift;

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			{/* Text underneath */}
			<AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
				<h1 style={{
					color: WHITE,
					fontSize: 160,
					fontWeight: 900,
					fontFamily: "system-ui, sans-serif",
					letterSpacing: "0.2em",
					textShadow: `0 0 40px rgba(255,255,255,0.3)`,
				}}>
					THE CAGE
				</h1>
			</AbsoluteFill>

			{/* Left/Top Panel */}
			<div style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "50%",
				backgroundColor: OBSIDIAN,
				transform: `translateY(${-totalShift}px)`,
				borderBottom: `2px solid ${GOLD}`,
			}} />

			{/* Right/Bottom Panel */}
			<div style={{
				position: "absolute",
				bottom: 0,
				left: 0,
				width: "100%",
				height: "50%",
				backgroundColor: OBSIDIAN,
				transform: `translateY(${totalShift}px)`,
				borderTop: `2px solid ${GOLD}`,
			}} />

			{/* Gold Fracture Lines */}
			<svg style={{ position: "absolute", width, height, pointerEvents: "none" }} viewBox={`0 0 ${width} ${height}`}>
				<path 
					d={path1} 
					stroke={GOLD} 
					strokeWidth="4" 
					fill="none" 
					strokeDasharray={evolved1.strokeDasharray} 
					strokeDashoffset={evolved1.strokeDashoffset}
					style={{ filter: `drop-shadow(0 0 10px ${GOLD})`, opacity: brightness }}
				/>
				<path 
					d={path2} 
					stroke={GOLD} 
					strokeWidth="4" 
					fill="none" 
					strokeDasharray={evolved2.strokeDasharray} 
					strokeDashoffset={evolved2.strokeDashoffset}
					style={{ filter: `drop-shadow(0 0 10px ${GOLD})`, opacity: brightness }}
				/>
				<path 
					d={path3} 
					stroke={GOLD} 
					strokeWidth="3" 
					fill="none" 
					strokeDasharray={evolved3.strokeDasharray} 
					strokeDashoffset={evolved3.strokeDashoffset}
					style={{ filter: `drop-shadow(0 0 8px ${GOLD})`, opacity: brightness }}
				/>
				<path 
					d={path4} 
					stroke={GOLD} 
					strokeWidth="3" 
					fill="none" 
					strokeDasharray={evolved4.strokeDasharray} 
					strokeDashoffset={evolved4.strokeDashoffset}
					style={{ filter: `drop-shadow(0 0 8px ${GOLD})`, opacity: brightness }}
				/>
			</svg>
		</AbsoluteFill>
	);
};
