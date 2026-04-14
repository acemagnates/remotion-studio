import { Composition } from "remotion";
import { Clip01 } from "./clips/Clip01";
import { Clip03 } from "./clips/Clip03";
import { Clip05 } from "./clips/Clip05";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="clip-01-MG-transparent"
        component={Clip01}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-03-MG-transparent"
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
    </>
  );
};
