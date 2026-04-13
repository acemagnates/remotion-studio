import { Composition } from "remotion";
import { CounterRoll } from "./CounterRoll";
import { LowerThird } from "./LowerThird";
import { SplitReveal } from "./SplitReveal";
import { EvidenceCard } from "./EvidenceCard";
import { ShatterBurst } from "./ShatterBurst";
import { TerminalType } from "./TerminalType";
import { DataTheater } from "./DataTheater";
import { GlitchInterference } from "./GlitchInterference";
import { ParticleDrift } from "./ParticleDrift";
import { KintsugiReveal } from "./KintsugiReveal";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="CounterRoll"
        component={CounterRoll}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="LowerThird"
        component={LowerThird}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="SplitReveal"
        component={SplitReveal}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="EvidenceCard"
        component={EvidenceCard}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="ShatterBurst"
        component={ShatterBurst}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="TerminalType"
        component={TerminalType}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="DataTheater"
        component={DataTheater}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="GlitchInterference"
        component={GlitchInterference}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="ParticleDrift"
        component={ParticleDrift}
        durationInFrames={210}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="KintsugiReveal"
        component={KintsugiReveal}
        durationInFrames={180}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
