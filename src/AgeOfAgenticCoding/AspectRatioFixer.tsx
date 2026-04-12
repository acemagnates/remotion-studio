import { 
  Img, 
  staticFile, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  Easing 
} from "remotion";

export const AspectRatioFixer = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // The Pan: We slide horizontally across the hidden "bleed" pixels
  // of our 1:1 image over the duration of the clip.
  const panX = interpolate(
    frame,
    [0, durationInFrames],
    [-50, 50], // Slides 100 pixels from left to right
    { 
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.sin) // Smooth start and stop
    }
  );

  return (
    <div style={{ 
      width: "1080px", 
      height: "1920px", // Strict 9:16 vertical frame
      overflow: "hidden", 
      backgroundColor: "#0A0A0A" 
    }}>
      <Img 
        src={staticFile("obsidian_king.png")} 
        style={{
          width: "100%",
          height: "100%",
          // THIS IS THE FIX: It center-crops the 1:1 square into the 9:16 div perfectly
          objectFit: "cover", 
          transform: `translateX(${panX}px)`
        }} 
      />
    </div>
  );
};
