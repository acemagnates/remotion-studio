import React from "react";
import { Composition } from "remotion";
import { Clip01MG } from "./clips/Clip01MG";
import { Clip02MG_Transparent } from "./clips/Clip02MG_Transparent";
import { Clip05MG_Transparent } from "./clips/Clip05MG_Transparent";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="clip-01-MG"
        component={Clip01MG}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-02-MG-transparent"
        component={Clip02MG_Transparent}
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
    </>
  );
};
