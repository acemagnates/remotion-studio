import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const SHARD_COUNT = 30;

const GlassShard = ({ index }: { index: number }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    const randoms = useMemo(() => ({
        velX: (Math.random() - 0.5) * 15,
        velY: (Math.random() - 0.5) * 15,
        velZ: Math.random() * 20 + 10,
        rotX: Math.random() * 0.1,
        rotY: Math.random() * 0.1,
        rotZ: Math.random() * 0.1,
        scale: Math.random() * 0.5 + 0.2,
    }), []);

    const progress = frame / 60;
    
    const posX = randoms.velX * progress;
    const posY = (randoms.velY * progress) - (0.5 * 9.8 * progress * progress); // Gravity
    const posZ = randoms.velZ * progress;

    const rotationX = frame * randoms.rotX;
    const rotationY = frame * randoms.rotY;
    const rotationZ = frame * randoms.rotZ;

    const opacity = interpolate(frame, [100, 150], [1, 0], { extrapolateRight: "clamp" });

    return (
        <mesh 
            position={[posX, posY, posZ]} 
            rotation={[rotationX, rotationY, rotationZ]}
            scale={[randoms.scale, randoms.scale, randoms.scale]}
        >
            <coneGeometry args={[1, 1, 3]} />
            <meshStandardMaterial 
                color={index % 2 === 0 ? "#ffffff" : "#C9A84C"} 
                transparent 
                opacity={opacity}
                roughness={0.1}
                metalness={0.8}
            />
        </mesh>
    );
};

export const Clip03_GlassShatter = () => {
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill>
            <ThreeCanvas width={width} height={height} alpha={true}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <group>
                    {Array.from({ length: SHARD_COUNT }).map((_, i) => (
                        <GlassShard key={i} index={i} />
                    ))}
                </group>
            </ThreeCanvas>
        </AbsoluteFill>
    );
};
