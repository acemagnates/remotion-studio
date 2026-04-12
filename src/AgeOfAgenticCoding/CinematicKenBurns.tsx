import { 
  Img, 
  staticFile, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  Easing 
} from "remotion";

export const CinematicKenBurns = ({ imagePath = "clip_01.png" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 1. ZOOM: Scale from 100% to 115%
  const scale = interpolate(
    frame,
    [0, durationInFrames],
    [1, 1.15],
    { 
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad) 
    }
  );

  // 2. PAN: Slide horizontally across the hidden "bleed" pixels
  const panX = interpolate(
    frame,
    [0, durationInFrames],
    [-40, 40], 
    { 
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad) 
    }
  );

  return (
    <div style={{ 
      width: "1080px", 
      height: "1920px", // 9:16 vertical frame
      overflow: "hidden", 
      backgroundColor: "#0A0A0A" 
    }}>
      <Img 
        src={staticFile(imagePath)} 
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // Center-crops 1:1 into 9:16 perfectly
          transform: `scale(${scale}) translateX(${panX}px)`,
          transformOrigin: "center center"
        }} 
      />
    </div>
  );
};
