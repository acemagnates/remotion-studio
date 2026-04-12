import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig, useCurrentFrame, interpolate, staticFile } from "remotion";
import { useTexture } from "@react-three/drei";
import React from "react";

const ParallaxLayers: React.FC<{ bg: string; subject: string; fg: string }> = ({ bg, subject, fg }) => {
  const bgTexture = useTexture(staticFile(bg));
  const subjectTexture = useTexture(staticFile(subject));
  const fgTexture = useTexture(staticFile(fg));

  return (
    <>
      {/* BACKGROUND: Slowest movement */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[16, 16]} />
        <meshBasicMaterial map={bgTexture} transparent />
      </mesh>

      {/* SUBJECT: Midground speed */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial map={subjectTexture} transparent />
      </mesh>

      {/* FOREGROUND: Fastest movement, deep parallax */}
      <mesh position={[0, -2, -1]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={fgTexture} transparent />
      </mesh>
    </>
  );
}

export const ParallaxEngine: React.FC<{ 
  bgPath: string; 
  subjectPath: string; 
  fgPath: string; 
}> = ({ 
  bgPath = "layers/bg.png", 
  subjectPath = "layers/subject.png", 
  fgPath = "layers/fg.png" 
}) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Z-Axis Push: Camera moves forward through 3D layers
  const cameraZ = interpolate(frame, [0, durationInFrames], [5, 2]);

  return (
    <div style={{ width: "1080px", height: "1920px", backgroundColor: "#0A0A0A" }}>
      <ThreeCanvas width={1080} height={1920} camera={{ position: [0, 0, cameraZ] }}>
        <ambientLight intensity={1.5} />
        <React.Suspense fallback={null}>
            <ParallaxLayers bg={bgPath} subject={subjectPath} fg={fgPath} />
        </React.Suspense>
      </ThreeCanvas>
    </div>
  );
};
