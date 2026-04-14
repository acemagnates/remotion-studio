import { Composition } from "remotion";
import { Clip01 } from "./clips/Clip01";
import { Clip03 } from "./clips/Clip03";
import { Clip05 } from "./clips/Clip05";
import { Clip08 } from "./clips/Clip08";
import { Clip10 } from "./clips/Clip10";
import { Clip12 } from "./clips/Clip12";
import { Clip14 } from "./clips/Clip14";
import { Clip16 } from "./clips/Clip16";
import { Clip17 } from "./clips/Clip17";
import { Clip20 } from "./clips/Clip20";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="clip-01-MG"
        component={Clip01}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-03-MG"
        component={Clip03}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-05-MG"
        component={Clip05}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-08-MG"
        component={Clip08}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-10-MG"
        component={Clip10}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-12-MG"
        component={Clip12}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-14-MG"
        component={Clip14}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-16-MG"
        component={Clip16}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-17-MG"
        component={Clip17}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-20-MG"
        component={Clip20}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
