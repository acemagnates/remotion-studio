import { Composition } from "remotion";
import { Clip01MG_Transparent } from "./clips/Clip01MG_Transparent";
import { Clip05MG } from "./clips/Clip05MG";
import { Clip10MG_Transparent } from "./clips/Clip10MG_Transparent";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="clip-01-MG-transparent"
        component={Clip01MG_Transparent}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-05-MG"
        component={Clip05MG}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-10-MG-transparent"
        component={Clip10MG_Transparent}
        durationInFrames={105}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
