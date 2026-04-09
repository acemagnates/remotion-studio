import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { MainClip } from "./AgeOfAgenticCoding/MainClip";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AgeOfAgenticCoding"
        component={MainClip}
        durationInFrames={1800}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="Main"
        component={MyComposition}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
