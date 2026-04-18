import { Composition } from "remotion";
import { Clip01MG_Transparent } from "./clips/Clip01MG_Transparent";
import { Clip03MG } from "./clips/Clip03MG";
import { Clip04MG_Transparent } from "./clips/Clip04MG_Transparent";
import { Clip05MG_Transparent } from "./clips/Clip05MG_Transparent";
import { Clip06MG } from "./clips/Clip06MG";
import { Clip09MG } from "./clips/Clip09MG";
import { Clip12MG_Transparent } from "./clips/Clip12MG_Transparent";
import { Clip14MG } from "./clips/Clip14MG";
import { Clip16MG_Transparent } from "./clips/Clip16MG_Transparent";

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
      <Composition
        id="clip-05-MG-transparent"
        component={Clip05MG_Transparent}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-06-MG"
        component={Clip06MG}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-09-MG"
        component={Clip09MG}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-12-MG-transparent"
        component={Clip12MG_Transparent}
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
        id="clip-16-MG-transparent"
        component={Clip16MG_Transparent}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
