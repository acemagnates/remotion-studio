import React from "react";
import { Composition } from "remotion";
import { Clip02MG_Transparent } from "./clips/Clip02MG_Transparent";
import { Clip04MG } from "./clips/Clip04MG";
import { Clip05MG_Transparent } from "./clips/Clip05MG_Transparent";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="clip-02-MG-transparent"
        component={Clip02MG_Transparent}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-04-MG"
        component={Clip04MG}
        durationInFrames={120}
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
    </>
  );
};
