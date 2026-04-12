import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { Video } from "@remotion/media";
import { ThreeCanvas } from "@remotion/three";

export const MainScene = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const textScale = spring({
    frame,
    fps,
    config: { damping: 200 }, 
  });

  const rotationY = frame * 0.02;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F3F4F6" }}>
      <AbsoluteFill style={{ opacity: 0.3 }}>
         <Video 
           src="https://remotion.media/video.mp4" 
           style={{ width: "100%", height: "100%", objectFit: "cover" }} 
         />
      </AbsoluteFill>

      <AbsoluteFill>
        <ThreeCanvas width={width} height={height}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <mesh rotation={[0, rotationY, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#3B82F6" />
          </mesh>
        </ThreeCanvas>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1
          style={{
            fontFamily: "sans-serif",
            fontSize: 100,
            color: "#1F2937",
            fontWeight: "bold",
            transform: `scale(${textScale})`,
            textAlign: "center",
            textShadow: "0px 4px 12px rgba(255,255,255,0.8)",
            margin: 0,
            marginTop: 400,
          }}
        >
          SYSTEM INITIALIZED
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
