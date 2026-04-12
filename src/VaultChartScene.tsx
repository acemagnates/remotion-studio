import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";

export const VaultChartScene = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 3D Background logic
  const gridPositionZ = (frame * 0.05) % 2;

  // Text entrance logic
  const titleDrop = spring({ 
    frame, 
    fps, 
    config: { damping: 16, mass: 1.5 } 
  });
  
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { 
    extrapolateRight: "clamp" 
  });

  // Data points
  const dataPoints = [
    { label: "Retail", targetHeight: 200, color: "#333333" },
    { label: "Institutions", targetHeight: 450, color: "#555555" },
    { label: "The 1%", targetHeight: 900, color: "#C9A84C" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", fontFamily: "sans-serif" }}>
      
      {/* LAYER 1: 3D Obsidian Vault Floor */}
      <AbsoluteFill>
        <ThreeCanvas width={width} height={height}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 2, 5]} intensity={1.5} color="#C9A84C" />
          
          <mesh position={[0, -3, gridPositionZ]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[40, 40, 20, 20]} />
            <meshStandardMaterial 
              color="#050505" 
              wireframe={true} 
              transparent={true}
              opacity={0.4}
            />
          </mesh>
        </ThreeCanvas>
      </AbsoluteFill>

      {/* LAYER 2: 2D Motion Graphics */}
      <AbsoluteFill style={{ padding: "120px 80px", display: "flex", flexDirection: "column" }}>
        
        {/* Header Text */}
        <div style={{ 
            opacity: titleOpacity, 
            transform: `translateY(${100 - (titleDrop * 100)}px)`,
            textShadow: "0px 8px 32px rgba(0,0,0,0.9)"
        }}>
          <h2 style={{ fontSize: 45, color: "#C9A84C", letterSpacing: "6px", margin: 0, textTransform: "uppercase" }}>
            Wealth Distribution
          </h2>
          <h1 style={{ fontSize: 110, color: "#FFFFFF", fontWeight: "900", margin: "10px 0 0 0", lineHeight: 1 }}>
            THE REAL DIVIDE
          </h1>
        </div>

        {/* Bar Chart Container */}
        <div style={{ 
            display: "flex", 
            flex: 1, 
            alignItems: "flex-end", 
            justifyContent: "space-between",
            gap: "80px", 
            marginTop: "100px",
            paddingBottom: "80px"
        }}>
          {dataPoints.map((point, index) => {
            const barProgress = spring({
              frame: frame - (index * 20) - 30,
              fps,
              config: { damping: 14, mass: 1.5, stiffness: 100 },
            });

            const currentHeight = barProgress * point.targetHeight;
            
            const labelOpacity = interpolate(barProgress, [0.5, 1], [0, 1], { 
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp"
            });

            return (
              <div key={point.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                
                {/* The Bar */}
                <div style={{
                  width: "100%",
                  height: Math.max(currentHeight, 4),
                  backgroundColor: point.color,
                  borderRadius: "16px 16px 0 0",
                  boxShadow: point.color === "#C9A84C" ? "0px -10px 60px rgba(201, 168, 76, 0.5)" : "none",
                }} />
                
                {/* The Label */}
                <div style={{ 
                    marginTop: "40px", 
                    fontSize: 45, 
                    fontWeight: "bold", 
                    opacity: labelOpacity, 
                    color: point.color === "#C9A84C" ? "#C9A84C" : "#A0A0A0",
                    textTransform: "uppercase",
                    letterSpacing: "2px"
                }}>
                  {point.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
