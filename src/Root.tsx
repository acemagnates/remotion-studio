import { Composition } from "remotion";
import { RomanEmpireScene } from "./RomanEmpireScene";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="RomanEmpireScene"
        component={RomanEmpireScene}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
