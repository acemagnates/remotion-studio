import { Composition } from "remotion";
import { Clip01 } from "./clips/Clip01";
import { Clip03 } from "./clips/Clip03";
import { Clip05 } from "./clips/Clip05";
import { Clip06 } from "./clips/Clip06";
import { Clip09 } from "./clips/Clip09";
import { Clip10 } from "./clips/Clip10";
import { Clip11 } from "./clips/Clip11";
import { Clip12 } from "./clips/Clip12";
import { Clip13 } from "./clips/Clip13";
import { Clip15 } from "./clips/Clip15";
import { Clip16 } from "./clips/Clip16";
import { Clip17 } from "./clips/Clip17";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Batch 1 */}
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
      {/* Batch 2 */}
      <Composition
        id="clip-06-MG"
        component={Clip06}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-09-MG"
        component={Clip09}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-10-MG-transparent"
        component={Clip10}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* Batch 3 */}
      <Composition
        id="clip-11-MG-transparent"
        component={Clip11}
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
        id="clip-13-MG-transparent"
        component={Clip13}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* Batch 4 */}
      <Composition
        id="clip-15-MG"
        component={Clip15}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-16-MG"
        component={Clip16}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-17-MG-transparent"
        component={Clip17}
        durationInFrames={105}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
