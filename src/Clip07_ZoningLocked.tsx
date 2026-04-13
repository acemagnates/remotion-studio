import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const Clip07_ZoningLocked = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const text = "ZONING: LOCKED";
    const charactersPerSecond = 10;
    const charactersShown = Math.floor(frame / (fps / charactersPerSecond));
    const displayedText = text.slice(0, charactersShown);
    
    // Cursor blinking
    const cursorVisible = Math.floor(frame / 15) % 2 === 0;

    return (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <div
                style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: 80,
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
                    letterSpacing: 2,
                    textAlign: "center",
                }}
            >
                {displayedText}
                <span style={{ opacity: cursorVisible ? 1 : 0, color: "#C9A84C" }}>_</span>
            </div>
        </AbsoluteFill>
    );
};
