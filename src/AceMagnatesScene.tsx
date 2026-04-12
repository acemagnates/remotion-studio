import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Video } from "@remotion/media";
import { ThreeCanvas } from "@remotion/three";

export const AceMagnatesScene = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const textScale = spring({
    frame,
    fps,
    config: { damping: 200 }, 
  });

  const rotationY = frame * 0.05;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <AbsoluteFill style={{ opacity: 0.2 }}>
         <Video 
           src="https://remotion.media/video.mp4" 
           style={{ width: "100%", height: "100%", objectFit: "cover" }} 
         />
      </AbsoluteFill>

      <AbsoluteFill>
        <ThreeCanvas width={width} height={height}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <mesh rotation={[0, rotationY, 0]} position={[0, 1.5, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#C9A84C" />
          </mesh>
        </ThreeCanvas>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            fontFamily: "sans-serif",
            fontSize: 80,
            color: "#FFFFFF",
            fontWeight: "bold",
            transform: `scale(${textScale})`,
            textAlign: "center",
            textShadow: "0px 4px 24px rgba(0,0,0,0.8)",
            margin: 0,
            marginTop: 400,
          }}
        >
          SPEED &gt; PERFECTION
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
