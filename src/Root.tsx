import { Composition } from "remotion";
import { MillionsSlam } from "./MillionsSlam";
import { TargetEvidenceCard } from "./TargetEvidenceCard";
import { MoneyWaterfall } from "./MoneyWaterfall";
import { GoldSplitLine } from "./GoldSplitLine";
import { DataWall } from "./DataWall";
import { DigitalWeb } from "./DigitalWeb";
import { TeamSplitSmash } from "./TeamSplitSmash";
import { ArchitecturalGraph } from "./ArchitecturalGraph";
import { ProfitBox } from "./ProfitBox";
import { GoldCrosshair } from "./GoldCrosshair";
import { MarketingSlam } from "./MarketingSlam";
import { GoldDust } from "./GoldDust";
import { ScoreboardSmash } from "./ScoreboardSmash";

// New Obsidian Vault Clips
import { Clip40mSlam } from "./Clip40mSlam";
import { ClientTerminated } from "./ClientTerminated";
import { TimestampOverlay } from "./TimestampOverlay";
import { MarginCrush } from "./MarginCrush";
import { ProfitsChart } from "./ProfitsChart";
import { BankruptVibrate } from "./BankruptVibrate";
import { KintsugiReveal } from "./KintsugiReveal";
import { ZeroResistance } from "./ZeroResistance";
import { LoseEdgeSlam } from "./LoseEdgeSlam";

// Ace Magnates Batch 3 
import { TacoStandSlam } from "./TacoStandSlam";
import { DataSplitFracture } from "./DataSplitFracture";
import { LocationStamp } from "./LocationStamp";
import { NumberFourLines } from "./NumberFourLines";
import { ThatsItRipple } from "./ThatsItRipple";
import { WordFlashMontage } from "./WordFlashMontage";
import { AddMoreStrike } from "./AddMoreStrike";
import { GoldLightLeaks } from "./GoldLightLeaks";
import { GoldDustParticles } from "./GoldDustParticles";
import { NotEverythingFade } from "./NotEverythingFade";
import { StandInLineDrop } from "./StandInLineDrop";


export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="clip-02-MG-40m-slam"
        component={Clip40mSlam}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-04-MG-client-terminated"
        component={ClientTerminated}
        durationInFrames={120} // 2.0s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-06-MG-time-stamp"
        component={TimestampOverlay}
        durationInFrames={120} // 2.0s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-07-MG-margin-crush"
        component={MarginCrush}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-11-MG-profits-chart"
        component={ProfitsChart}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-15-MG-bankrupt-vibrate"
        component={BankruptVibrate}
        durationInFrames={120} // 2.0s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-17-MG-kintsugi-reveal"
        component={KintsugiReveal}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-23-MG-zero-resistance"
        component={ZeroResistance}
        durationInFrames={180} // 3.0s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-24-MG-lose-edge"
        component={LoseEdgeSlam}
        durationInFrames={180} // 3.0s
        fps={60}
        width={1080}
        height={1920}
      />

      {/* New Requested Clips Batch */}
      <Composition
        id="clip-01-MG-taco-stand"
        component={TacoStandSlam}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-03-MG-data-split"
        component={DataSplitFracture}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-05-MG-location-stamp"
        component={LocationStamp}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-07-MG-four-lines"
        component={NumberFourLines}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-11-MG-thats-it"
        component={ThatsItRipple}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-13-MG-flash-montage"
        component={WordFlashMontage}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-17-MG-add-more-strike"
        component={AddMoreStrike}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-19-MG-gold-leak"
        component={GoldLightLeaks}
        durationInFrames={180} // 3.0s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-20-MG-gold-dust"
        component={GoldDustParticles}
        durationInFrames={210} // 3.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-21-MG-not-everything"
        component={NotEverythingFade}
        durationInFrames={150} // 2.5s
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-23-MG-stand-in-line"
        component={StandInLineDrop}
        durationInFrames={180} // 3.0s
        fps={60}
        width={1080}
        height={1920}
      />


      {/* Legacy/Original Clips */}
      <Composition
        id="clip-01-MG"
        component={MillionsSlam}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="clip-02-MG"
        component={TargetEvidenceCard}
        durationInFrames={150}
        fps={60}
        width={1080}
        height={1920}
      />
      {/* ... keeping others for reference or removing if strictly following user request only ... */}
      {/* User request is a set of new clips, I'll keep the legacy ones below the new ones */}
    </>
  );
};

