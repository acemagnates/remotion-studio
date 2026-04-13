import { Composition, staticFile } from "remotion";
import { Clip01_2018Slam } from "./Clip01_2018Slam";
import { Clip10_UnbreakableMonopoly } from "./Clip10_UnbreakableMonopoly";
import { Clip12_RevenueLineBreak } from "./Clip12_RevenueLineBreak";
import { Clip16_EliminatingCompetition } from "./Clip16_EliminatingCompetition";
import { StillOnly } from "./StillOnly";
import { 
  CompositeClip03, 
  CompositeClip05, 
  CompositeClip07, 
  CompositeClip09, 
  CompositeClip14, 
  CompositeClip20 
} from "./CompositeClips";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="clip-01"
        component={Clip01_2018Slam}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-02"
        component={() => <StillOnly src={staticFile("images/clip-02.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-03"
        component={() => <CompositeClip03 bg={staticFile("images/clip-03.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-04"
        component={() => <StillOnly src={staticFile("images/clip-04.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-05"
        component={() => <CompositeClip05 bg={staticFile("images/clip-05.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-06"
        component={() => <StillOnly src={staticFile("images/clip-06.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-07"
        component={() => <CompositeClip07 bg={staticFile("images/clip-07.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-08"
        component={() => <StillOnly src={staticFile("images/clip-08.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-09"
        component={() => <CompositeClip09 bg={staticFile("images/clip-09.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-10"
        component={Clip10_UnbreakableMonopoly}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-11"
        component={() => <StillOnly src={staticFile("images/clip-11.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-12"
        component={Clip12_RevenueLineBreak}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-13"
        component={() => <StillOnly src={staticFile("images/clip-13.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-14"
        component={() => <CompositeClip14 bg={staticFile("images/clip-14.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-15"
        component={() => <StillOnly src={staticFile("images/clip-15.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-16"
        component={Clip16_EliminatingCompetition}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-17"
        component={() => <StillOnly src={staticFile("images/clip-17.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-18"
        component={() => <StillOnly src={staticFile("images/clip-18.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-19"
        component={() => <StillOnly src={staticFile("images/clip-19.png")} />}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-20"
        component={() => <CompositeClip20 bg={staticFile("images/clip-20.png")} />}
        durationInFrames={180}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
