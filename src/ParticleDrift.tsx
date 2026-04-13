import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";

const GOLD = "#C9A84C";

const DustMote = ({ seed }: { seed: number }) => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	const initialX = useMemo(() => (Math.random() - 0.5) * 10, [seed]);
	const initialY = useMemo(() => (Math.random() - 0.5) * 15, [seed]);
	const initialZ = useMemo(() => Math.random() * -5, [seed]);
	const speed = useMemo(() => Math.random() * 0.005 + 0.002, [seed]);
	const size = useMemo(() => Math.random() * 0.03 + 0.01, [seed]);

	const driftX = frame * speed;
	const driftY = Math.sin(frame * 0.01 + seed) * 0.1;

	return (
		<mesh position={[initialX + driftX, initialY + driftY, initialZ]}>
			<sphereGeometry args={[size, 6, 6]} />
			<meshStandardMaterial 
				color={GOLD} 
				emissive={GOLD} 
				emissiveIntensity={interpolate(Math.sin(frame * 0.05 + seed), [-1, 1], [1, 3])} 
			/>
		</mesh>
	);
};

export const ParticleDrift = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Fade in/out
	const opacity = interpolate(
		frame,
		[0, 60, durationInFrames - 30, durationInFrames],
		[0, 1, 1, 0],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" }
	);

	return (
		<AbsoluteFill style={{ opacity }}>
			<ThreeCanvas alpha={true} camera={{ position: [0, 0, 5] }}>
				<ambientLight intensity={0.5} />
				<pointLight position={[5, 5, 5]} intensity={1} />
				{new Array(20).fill(0).map((_, i) => (
					<DustMote key={i} seed={i} />
				))}
			</ThreeCanvas>
		</AbsoluteFill>
	);
};
