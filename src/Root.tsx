import { Composition } from "remotion";
import { Clip01MG_Transparent } from "./clips/Clip01MG_Transparent";
import { Clip03MG } from "./clips/Clip03MG";
import { Clip04MG_Transparent } from "./clips/Clip04MG_Transparent";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="clip-01-MG-transparent"
        component={Clip01MG_Transparent}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-03-MG"
        component={Clip03MG}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-04-MG-transparent"
        component={Clip04MG_Transparent}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
