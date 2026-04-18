import { Composition } from "remotion";
import { Clip01MG_Transparent } from "./clips/Clip01MG_Transparent";
import { Clip02MG } from "./clips/Clip02MG";
import { Clip04MG } from "./clips/Clip04MG";
import { Clip06MG_Transparent } from "./clips/Clip06MG_Transparent";
import { Clip08MG_Transparent } from "./clips/Clip08MG_Transparent";
import { Clip10MG } from "./clips/Clip10MG";
import { Clip12MG } from "./clips/Clip12MG";
import { Clip14MG } from "./clips/Clip14MG";
import { Clip15MG_Transparent } from "./clips/Clip15MG_Transparent";
import { Clip16MG_Transparent } from "./clips/Clip16MG_Transparent";
import { Clip18MG_Transparent } from "./clips/Clip18MG_Transparent";
import { Clip20MG } from "./clips/Clip20MG";

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
      <Composition
        id="clip-12-MG"
        component={Clip12MG}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-14-MG"
        component={Clip14MG}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-15-MG-transparent"
        component={Clip15MG_Transparent}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-16-MG-transparent"
        component={Clip16MG_Transparent}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-18-MG-transparent"
        component={Clip18MG_Transparent}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-20-MG"
        component={Clip20MG}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
