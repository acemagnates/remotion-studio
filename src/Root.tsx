import { Composition } from "remotion";
import { Clip01 } from "./Clip01";
import { Clip09 } from "./Clip09";
import { Clip16 } from "./Clip16";
import { Clip18 } from "./Clip18";
import { Clip20 } from "./Clip20";
import { Clip25 } from "./Clip25";
import { Clip26 } from "./Clip26";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="clip-01-MG"
        component={Clip01}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-09-MG"
        component={Clip09}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-16-MG"
        component={Clip16}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-18-MG"
        component={Clip18}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-20-MG"
        component={Clip20}
        durationInFrames={180}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-25-MG"
        component={Clip25}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-26-MG"
        component={Clip26}
        durationInFrames={180}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
