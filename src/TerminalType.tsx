import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";

const GOLD = "#C9A84C";
const WHITE = "#FFFFFF";

export const TerminalType = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Typing logic
	const fullText = "TOTAL JOBS CREATED: 15";
	const typingSpeed = 1.5; // characters per frame
	const typingProgress = Math.min(fullText.length, Math.floor(frame / typingSpeed));
	const visibleText = fullText.substring(0, typingProgress);

	// Blinking cursor
	const cursorVisible = Math.floor(frame / 5) % 2 === 0;

	// ACT 2: EVOLUTION
	const scale = interpolate(frame, [0, durationInFrames], [1, 1.04]);
	const glow = interpolate(Math.sin(frame * 0.1), [-1, 1], [10, 20]);

	// ACT 3: GLITCH EXIT
	const isExiting = frame > durationInFrames - 20;
	const glitchX = isExiting ? (Math.random() - 0.5) * 50 : 0;
	const glitchOpacity = isExiting ? (Math.random() > 0.5 ? 1 : 0) : 1;

	const exitFade = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
		extrapolateLeft: "clamp",
	});

	return (
		<AbsoluteFill style={{ 
			justifyContent: "center", 
			alignItems: "center",
			opacity: exitFade * glitchOpacity,
		}}>
			<div style={{
				display: "flex",
				alignItems: "center",
				transform: `scale(${scale}) translateX(${glitchX}px)`,
				backgroundColor: "rgba(10, 10, 10, 0.7)",
				padding: "20px 40px",
				border: `1px solid rgba(201, 168, 76, 0.3)`,
				boxShadow: `0 0 ${glow}px rgba(201, 168, 76, 0.2)`,
			}}>
				<span style={{
					color: WHITE,
					fontSize: 60,
					fontFamily: "'Courier New', Courier, monospace",
					fontWeight: "bold",
					textShadow: `0 0 10px rgba(201, 168, 76, 0.5)`,
				}}>
					{visibleText}
				</span>
				{cursorVisible && (
					<div style={{
						width: 30,
						height: 50,
						backgroundColor: GOLD,
						marginLeft: 10,
						boxShadow: `0 0 15px ${GOLD}`,
					}} />
				)}
			</div>
			
			{/* Subtle background glow scanline */}
			<div style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: 2,
				backgroundColor: GOLD,
				opacity: 0.1,
				transform: `translateY(${interpolate(frame % 120, [0, 120], [0, 1920])}px)`,
			}} />
		</AbsoluteFill>
	);
};
