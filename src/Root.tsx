import { Composition } from "remotion";
import { Clip01 } from "./clips/Video427/Clip01";
import { Clip03 } from "./clips/Video427/Clip03";
import { Clip04 } from "./clips/Video427/Clip04";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Video427-clip-01-MG-overlay"
        component={Clip01}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Video427-clip-03-MG"
        component={Clip03}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Video427-clip-04-MG-overlay"
        component={Clip04}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
