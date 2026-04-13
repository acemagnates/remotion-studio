import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { useMemo } from "react";

const GOLD = "#C9A84C";
const OBSIDIAN = "#0A0A0A";
const WHITE = "#FFFFFF";

const Shard = ({ index, total }: { index: number; total: number }) => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// ACT 1: EXPLOSION (0.5 - 1.0s)
	const burst = spring({
		frame: frame - 10,
		fps,
		config: { damping: 10, stiffness: 100 },
	});

	// Random properties per shard
	const angle = (index / total) * Math.PI * 2;
	const distance = interpolate(burst, [0, 1], [0, 800 + Math.random() * 400]);
	const rotation = interpolate(burst, [0, 1], [0, Math.random() * 720 - 360]);

	// ACT 2: CONTINUOUS DRIFT
	const drift = interpolate(frame, [0, durationInFrames], [0, 100 * (index % 5 - 2)]);
	const parallax = interpolate(frame, [0, durationInFrames], [1, 1.5]);

	const x = Math.cos(angle) * distance + Math.sin(frame * 0.02) * 50;
	const y = Math.sin(angle) * distance + Math.cos(frame * 0.02) * 50;

	// Polygons for shards
	const clipPath = useMemo(() => {
		const points = [];
		for (let i = 0; i < 3 + (index % 3); i++) {
			points.push(`${Math.random() * 100}% ${Math.random() * 100}%`);
		}
		return `polygon(${points.join(", ")})`;
	}, [index]);

	return (
		<div style={{
			position: "absolute",
			top: "50%",
			left: "50%",
			width: 200 + (index % 100),
			height: 200 + (index % 100),
			backgroundColor: OBSIDIAN,
			border: `0.5px solid ${GOLD}`,
			clipPath,
			transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation + drift}deg) scale(${parallax})`,
			opacity: interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0]),
		}} />
	);
};

export const ShatterBurst = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// ACT 1: ENTRANCE (Reveal text)
	const reveal = spring({
		frame: frame - 20,
		fps,
		config: { damping: 12, stiffness: 200 },
	});

	const textOpacity = interpolate(reveal, [0, 1], [0, 1]);
	const textScale = interpolate(frame, [0, durationInFrames], [0.8, 1.1]);

	// ACT 3: EXIT
	const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0]);

	return (
		<AbsoluteFill style={{ backgroundColor: "#000", opacity: exit }}>
			{/* révélation text underneath */}
			<AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
				<h1 style={{
					color: WHITE,
					fontSize: 140,
					fontWeight: 900,
					fontFamily: "system-ui, sans-serif",
					letterSpacing: "0.2em",
					opacity: textOpacity,
					transform: `scale(${textScale})`,
					textShadow: `0 0 30px rgba(255,255,255,0.4)`,
				}}>
					THE TRAP
				</h1>
			</AbsoluteFill>

			{/* The gold screen that shatters */}
			{frame < 120 && (
				<AbsoluteFill style={{ 
					backgroundColor: GOLD,
					opacity: interpolate(frame, [10, 20], [1, 0]),
					zIndex: 5
				}} />
			)}

			{/* Shards */}
			{new Array(30).fill(0).map((_, i) => (
				<Shard key={i} index={i} total={30} />
			))}
		</AbsoluteFill>
	);
};
