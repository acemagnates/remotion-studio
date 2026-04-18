import { Composition } from "remotion";
import { Clip01MG_Transparent } from "./clips/Clip01MG_Transparent";
import { Clip02MG } from "./clips/Clip02MG";
import { Clip04MG } from "./clips/Clip04MG";
import { Clip06MG_Transparent } from "./clips/Clip06MG_Transparent";
import { Clip08MG_Transparent } from "./clips/Clip08MG_Transparent";
import { Clip10MG } from "./clips/Clip10MG";

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
      <Composition
        id="clip-06-MG-transparent"
        component={Clip06MG_Transparent}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-08-MG-transparent"
        component={Clip08MG_Transparent}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-10-MG"
        component={Clip10MG}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
