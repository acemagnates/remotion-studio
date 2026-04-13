import { AbsoluteFill, useVideoConfig, Img, staticFile } from "remotion";

export const StillOnly = ({ src }: { src: string }) => {
    return (
        <AbsoluteFill>
            <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
    );
};
