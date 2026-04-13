import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";

const GOLD = "#C9A84C";
const OBSIDIAN = "#0A0A0A";

const Particles = () => {
	const frame = useCurrentFrame();
	const particles = useMemo(() => {
		return new Array(50).fill(0).map((_, i) => ({
			x: (Math.random() - 0.5) * 10,
			y: (Math.random() - 0.5) * 10,
			z: (Math.random() - 0.5) * 10,
			size: Math.random() * 0.05 + 0.02,
			speed: Math.random() * 0.02 + 0.01,
		}));
	}, []);

	return (
		<group>
			{particles.map((p, i) => {
				const drift = frame * p.speed;
				return (
					<mesh key={i} position={[p.x, p.y + drift, p.z]}>
						<sphereGeometry args={[p.size, 8, 8]} />
						<meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={2} />
					</mesh>
				);
			})}
		</group>
	);
};

export const CounterRoll = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames, width, height } = useVideoConfig();

	// ACT 1: ENTRANCE (0.5 - 1.0s)
	const rollSpring = spring({
		frame,
		fps,
		config: { damping: 12, stiffness: 200 },
	});

	const count = interpolate(rollSpring, [0, 1], [0, 1000000000]);
	const formattedCount = "$" + Math.floor(count).toLocaleString();

	// ACT 2: HOLD + EVOLUTION (1.5 - 2.5s)
	const scale = interpolate(frame, [0, durationInFrames], [1, 1.05]);
	
	// ACT 3: EXIT (0.3 - 0.5s)
	const exit = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return (
		<AbsoluteFill style={{ backgroundColor: OBSIDIAN, opacity: exit }}>
			{/* Border */}
			<div style={{
				position: "absolute",
				inset: 20,
				border: `1px solid ${GOLD}`,
				opacity: 0.3,
				pointerEvents: "none"
			}} />

			{/* Three.js Particles in background */}
			<AbsoluteFill>
				<ThreeCanvas orthographic={false} camera={{ position: [0, 0, 5] }} width={width} height={height}>
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} intensity={1} />
					<Particles />
				</ThreeCanvas>
			</AbsoluteFill>

			{/* Counter Text */}
			<AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
				<div style={{
					color: "white",
					fontSize: 120,
					fontWeight: 900,
					fontFamily: "system-ui, sans-serif",
					textAlign: "center",
					transform: `scale(${scale})`,
					textShadow: `0 0 20px rgba(201,168,76,0.4)`,
				}}>
					{formattedCount.split("").map((char, i) => (
						<span key={i} style={{ display: "inline-block" }}>{char}</span>
					))}
				</div>
				<div style={{
					color: GOLD,
					fontSize: 40,
					fontWeight: 600,
					letterSpacing: "0.5em",
					marginTop: 20,
					opacity: rollSpring,
					transform: `translateY(${interpolate(rollSpring, [0, 1], [20, 0])}px)`
				}}>
					BILLION
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
