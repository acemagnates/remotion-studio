import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { useMemo } from "react";

const GOLD = "#C9A84C";

const Slice = ({ i }: { i: number }) => {
	const frame = useCurrentFrame();
	const { width, height } = useVideoConfig();
	
	const randomFreq = useMemo(() => Math.random() * 2, []);
	const randomOffset = useMemo(() => (Math.random() - 0.5) * 100, []);
	
	const intensity = interpolate(frame, [0, 30, 120, 150], [0, 1, 1, 0]);
	const jitter = Math.sin(frame * 0.8 + i) * 20 * intensity;
	
	const yStart = (i * 10) % 100;
	const yEnd = ((i + 1) * 10) % 100;

	return (
		<AbsoluteFill style={{
			clipPath: `inset(${yStart}% 0 ${100 - yEnd}% 0)`,
			transform: `translateX(${jitter + randomOffset * intensity}px)`,
			filter: `hue-rotate(${i * 20}deg)`,
		}}>
			<AbsoluteFill style={{ backgroundColor: "rgba(201, 168, 76, 0.1)" }} />
		</AbsoluteFill>
	);
};

export const GlitchInterference = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// RGB Split simulation
	const rgbOffset = Math.sin(frame * 0.5) * 10 * interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			{/* Base level static noise simulation */}
			<AbsoluteFill style={{ opacity: 0.1 }}>
				{new Array(10).fill(0).map((_, i) => (
					<div key={i} style={{
						position: "absolute",
						top: (Math.random() * 100) + "%",
						left: 0,
						width: "100%",
						height: 2,
						backgroundColor: WHITE,
						transform: `scaleX(${Math.random()})`,
					}} />
				))}
			</AbsoluteFill>

			{/* RGB Split layers */}
			<AbsoluteFill style={{ transform: `translateX(${rgbOffset}px)`, opacity: 0.8 }}>
				<AbsoluteFill style={{ backgroundColor: "rgba(255, 0, 0, 0.2)", mixBlendMode: "screen" }} />
			</AbsoluteFill>
			<AbsoluteFill style={{ transform: `translateX(${-rgbOffset}px)`, opacity: 0.8 }}>
				<AbsoluteFill style={{ backgroundColor: "rgba(0, 0, 255, 0.2)", mixBlendMode: "screen" }} />
			</AbsoluteFill>

			{/* Glitch Slices */}
			{new Array(15).fill(0).map((_, i) => (
				<Slice key={i} i={i} />
			))}

			{/* Moving Scanlines */}
			<AbsoluteFill>
				{new Array(20).fill(0).map((_, i) => {
					const y = interpolate((frame * 5 + i * 100) % 1920, [0, 1920], [0, 1920]);
					return (
						<div key={i} style={{
							position: "absolute",
							top: y,
							left: 0,
							width: "100%",
							height: 1,
							backgroundColor: "rgba(255,255,255,0.05)",
						}} />
					);
				})}
			</AbsoluteFill>

			{/* Heavy Jitter Overlays */}
			{frame % 4 === 0 && (
				<AbsoluteFill style={{ 
					backgroundColor: "rgba(201, 168, 76, 0.05)",
					transform: `translate(${(Math.random()-0.5)*40}px, ${(Math.random()-0.5)*40}px)`
				}} />
			)}
		</AbsoluteFill>
	);
};

const WHITE = "#FFFFFF";
