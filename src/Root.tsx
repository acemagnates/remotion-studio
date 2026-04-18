import { Composition } from "remotion";
import { Clip01MG_Transparent } from "./clips/Clip01MG_Transparent";
import { Clip02MG } from "./clips/Clip02MG";
import { Clip04MG } from "./clips/Clip04MG";

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
        id="clip-02-MG"
        component={Clip02MG}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-04-MG"
        component={Clip04MG}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
