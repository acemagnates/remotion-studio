import { Composition } from "remotion";
import { Clip01 } from "./Clip01";
import { Clip02 } from "./Clip02";
import { Clip03 } from "./Clip03";
import { Clip05 } from "./Clip05";
import { Clip06 } from "./Clip06";
import { Clip09 } from "./Clip09";
import { Clip11 } from "./Clip11";
import { Clip12 } from "./Clip12";
import { Clip13 } from "./Clip13";
import { Clip15 } from "./Clip15";
import { Clip17 } from "./Clip17";
import { Clip18 } from "./Clip18";
import { Clip19 } from "./Clip19";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="clip-01-MG"
        component={Clip01}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-02-MG"
        component={Clip02}
        durationInFrames={120}
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
        id="clip-05-MG-transparent"
        component={Clip05}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-06-MG-transparent"
        component={Clip06}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-09-MG"
        component={Clip09}
        durationInFrames={105}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-11-MG-transparent"
        component={Clip11}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-12-MG"
        component={Clip12}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-13-MG"
        component={Clip13}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-15-MG-transparent"
        component={Clip15}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-17-MG"
        component={Clip17}
        durationInFrames={105}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-18-MG-transparent"
        component={Clip18}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-19-MG-transparent"
        component={Clip19}
        durationInFrames={105}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
