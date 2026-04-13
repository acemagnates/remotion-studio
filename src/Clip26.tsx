import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Clip26 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const continuousScale = interpolate(frame, [0, 180], [1, 1.02]);
  const sweepProgress = (frame % 180) / 180;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      {/* Background */}
      <AbsoluteFill 
        style={{ 
          background: 'radial-gradient(circle at center, rgba(15,15,15,1) 0%, rgba(0,0,0,1) 100%)',
        }} 
      />

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity, transform: `scale(${continuousScale})` }}>
        {/* Mock Crest */}
        <div style={{ position: "relative", textAlign: "center" }}>
          <div
            style={{
              width: "400px",
              height: "400px",
              border: "8px solid #C9A84C",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              background: "linear-gradient(45deg, #0A0A0A, #1A1A1A)",
              boxShadow: "0 0 40px rgba(201,168,76,0.3)",
              overflow: "hidden",
            }}
          >
             <h1 style={{ color: "#C9A84C", fontSize: "120px", fontFamily: "Serif", fontWeight: "bold" }}>AM</h1>
             
             {/* Gold Light Sweep */}
             <div 
               style={{
                 position: "absolute",
                 top: 0,
                 left: "-100%",
                 width: "50%",
                 height: "100%",
                 background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)",
                 transform: `translateX(${sweepProgress * 400}%) skewX(-20deg)`,
               }}
             />
          </div>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "80px",
              fontWeight: "900",
              color: "white",
              marginTop: "60px",
              letterSpacing: "12px",
              textShadow: "0 4px 15px rgba(0,0,0,0.8)",
            }}
          >
            ACE MAGNATES
          </h2>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
