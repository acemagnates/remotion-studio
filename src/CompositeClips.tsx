import { AbsoluteFill, Img } from "remotion";
import { Clip03_GlassShatter } from "./Clip03_GlassShatter";
import { Clip05_AssetSecured } from "./Clip05_AssetSecured";
import { Clip07_ZoningLocked } from "./Clip07_ZoningLocked";
import { Clip09_CashPop } from "./Clip09_CashPop";
import { Clip14_400PercentFlash } from "./Clip14_400PercentFlash";
import { Clip20_MaintenanceDrop } from "./Clip20_MaintenanceDrop";

export const CompositeClip03 = ({ bg }: { bg: string }) => (
    <AbsoluteFill>
        <Img src={bg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Clip03_GlassShatter />
    </AbsoluteFill>
);

export const CompositeClip05 = ({ bg }: { bg: string }) => (
    <AbsoluteFill>
        <Img src={bg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Clip05_AssetSecured />
    </AbsoluteFill>
);

export const CompositeClip07 = ({ bg }: { bg: string }) => (
    <AbsoluteFill>
        <Img src={bg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Clip07_ZoningLocked />
    </AbsoluteFill>
);

export const CompositeClip09 = ({ bg }: { bg: string }) => (
    <AbsoluteFill>
        <Img src={bg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Clip09_CashPop />
    </AbsoluteFill>
);

export const CompositeClip14 = ({ bg }: { bg: string }) => (
    <AbsoluteFill>
        <Img src={bg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Clip14_400PercentFlash />
    </AbsoluteFill>
);

export const CompositeClip20 = ({ bg }: { bg: string }) => (
    <AbsoluteFill>
        <Img src={bg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <Clip20_MaintenanceDrop />
    </AbsoluteFill>
);
