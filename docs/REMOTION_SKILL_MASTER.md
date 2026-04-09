---
name: remotion-complete-master-skill
description: Comprehensive Master Skill for Remotion - Programmatic Video in React
metadata:
  tags: remotion, video, react, animation, master-skill, full-documentation
---

# Remotion Master Skill

This document is a consolidated master skill containing all best practices and patterns for programmatic video generation with Remotion.

## Core Concepts

### When to use
Use these skills whenever you are dealing with Remotion code to obtain domain-specific knowledge. All animations MUST be driven by React state and the `useCurrentFrame()` hook.

### Fundamentals
- **Animations:** All animations MUST be driven by the `useCurrentFrame()` hook.
- **FPS:** Write animations in seconds and multiply them by the `fps` value from `useVideoConfig()`.
- **No CSS Transitions:** CSS transitions or animations are FORBIDDEN - they will not render correctly.
- **No Tailwind Animations:** Tailwind animation class names are FORBIDDEN.

---

## 1. Compositions & Metadata

### Defining Compositions
A `<Composition>` defines the component, width, height, fps, and duration of a renderable video. It normally is placed in the `src/Root.tsx` file.

```tsx
import { Composition } from "remotion";
import { MyComposition } from "./MyComposition";

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyComposition"
      component={MyComposition}
      durationInFrames={100}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
```

### Dynamic Metadata (calculateMetadata)
Use `calculateMetadata` on a `<Composition>` to dynamically set duration, dimensions, and transform props before rendering.

```tsx
import { CalculateMetadataFunction } from "remotion";

const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props }) => {
  // Example: Setting duration based on a video src
  const durationInSeconds = await getVideoDuration(props.videoSrc);
  return {
    durationInFrames: Math.ceil(durationInSeconds * 30),
  };
};
```

---

## 2. Assets & Media

### Importing Assets
Always use `staticFile()` to reference files from the `public/` folder. Place assets like images, videos, audio, and fonts in `public/`.

```tsx
import { Img, staticFile } from "remotion";
<Img src={staticFile("logo.png")} />;
```

### Images
Always use the `<Img>` component from `remotion`. Do not use native `<img>` or CSS `background-image`.

### Videos
Use `<Video>` from `@remotion/media`.
- **Trimming:** Use `trimBefore` and `trimAfter` (values in seconds or frames depending on API, check `videos.md`).
- **Volume:** Set static volume (0-1) or a callback for dynamic volume.
- **Playback Rate:** Use `playbackRate` for speed changes (0.5x, 2x, etc.).

### Audio & Sound Effects
Use `<Audio>` from `@remotion/media`.
- **Sound Effects:** Common effects like `whoosh.wav`, `ding.wav`, `bruh.wav` are available at `https://remotion.media/[name].wav`.
- **Audio Visualization:** Use `useWindowedAudioData()` and `visualizeAudio()` from `@remotion/media-utils` for spectrum bars and waveforms.

---

## 3. Animation & Timing

### Interpolation & Easing
Simple linear interpolation: `const opacity = interpolate(frame, [0, 100], [0, 1])`.
Use `Easing` for non-linear motion: `Easing.inOut(Easing.quad)`.

### Spring Animations
Natural motion using physics:
```tsx
const scale = spring({
  frame,
  fps,
  config: { damping: 200 }, // Recommended for no bounce
});
```

### Sequencing
Use `<Sequence>` to delay elements:
```tsx
<Sequence from={30} durationInFrames={60}>
  <MyComponent />
</Sequence>
```
Always use `premountFor` to avoid loading stutters.

---

## 4. Text & Typography

### Fonts
Load Google Fonts using `@remotion/google-fonts`:
```tsx
import { loadFont } from "@remotion/google-fonts/Lobster";
const { fontFamily } = loadFont();
```

### Text Animations
- **Typewriter:** Use string slicing based on `useCurrentFrame()`.
- **Measuring Text:** Use `@remotion/layout-utils` for `measureText()` and `fitText()` to handle dynamic text sizing.

---

## 5. Advanced Modules

### 3D (Three.js)
Use `@remotion/three` and wrap content in `<ThreeCanvas>`. All 3D animations MUST be driven by `useCurrentFrame()`.

### Transitions & Overlays
Use `@remotion/transitions` for scene transitions (fade, slide, wipe).
```tsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}><SceneA /></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
  <TransitionSeries.Sequence durationInFrames={60}><SceneB /></TransitionSeries.Sequence>
</TransitionSeries>
```

### Maps (Mapbox)
Use `mapbox-gl` and `@turf/turf`. Animate the camera and lines by updating Mapbox state via `useEffect` driven by `useCurrentFrame()`.

### Lottie
Use `@remotion/lottie` to embed Lottie animations. Fetch JSON and render via the `<Lottie>` component.

---

## 6. Captions & Subtitles

### Transcription
Use `@remotion/install-whisper-cpp` to generate JSON captions from audio.

### Displaying Captions
Use `@remotion/captions` to group captions into pages (TikTok style) and highlight words as they are spoken.

---

## 7. Rendering & Export

### Transparent Videos
- **ProRes 4444:** For high-quality editing (`--codec=prores --prores-profile=4444`).
- **WebM (VP9):** For browser playback (`--codec=vp9 --pixel-format=yuva420p`).

### FFmpeg
`ffmpeg` and `ffprobe` are available via `bunx remotion ffmpeg`. Use for pre-processing assets if needed.

---

## Full Rule Index

### 3D Content
*Source: rules/3d.md*
Follow React Three Fiber best practices. Wrap in `<ThreeCanvas>`. No `useFrame()` - use `useCurrentFrame()`.

### Fundamental Animations
*Source: rules/animations.md*
CSS/Tailwind animations are forbidden. Use `interpolate` and `spring`.

### Asset Management
*Source: rules/assets.md*
Use `staticFile()`. Support for remote URLs with CORS.

### Audio Visualization
*Source: rules/audio-visualization.md*
Spectrum bars, waveforms, bass-reactive effects using `@remotion/media-utils`.

### Audio Control
*Source: rules/audio.md*
Volume, playbackRate, loop, toneFrequency (pitch).

### Dynamic Metadata
*Source: rules/calculate-metadata.md*
Async metadata calculation for dynamic duration/dimensions.

### Decode Validation
*Source: rules/can-decode.md*
Check browser compatibility using Mediabunny.

### Charts
*Source: rules/charts.md*
Bar, pie, line (via `@remotion/paths`). Avoid 3rd party charting library animations.

### Composition Structure
*Source: rules/compositions.md*
Defining IDs, fps, dimensions. Folders and Stills.

### Caption Display
*Source: rules/display-captions.md*
TikTok style paging and word highlighting.

### Frame Extraction
*Source: rules/extract-frames.md*
Extract thumbnails using Mediabunny.

### FFmpeg Usage
*Source: rules/ffmpeg.md*
CLI usage for re-encoding and pre-trimming.

### Font Loading
*Source: rules/fonts.md*
Google Fonts and local WOFF2 files.

### Media Metrics
*Source: rules/get-audio-duration.md*, *rules/get-video-dimensions.md*, *rules/get-video-duration.md*
Extracting metadata using Mediabunny.

### Animated Images (GIFs/WebP)
*Source: rules/gifs.md*
Synchronized playback of animated frames.

### Image Optimization
*Source: rules/images.md*
Pattern for image sequences and dynamic avatars.

### Subtitle Import
*Source: rules/import-srt-captions.md*
Parsing SRT files into the JSON `Caption` format.

### Effects
*Source: rules/light-leaks.md*
WebGL-based decorative overlays.

### Lottie Integration
*Source: rules/lottie.md*
JSON-based vector animations.

### Map Animations
*Source: rules/maps.md*
Mapbox Standard, camera paths, and line drawing.

### DOM Measurement
*Source: rules/measuring-dom-nodes.md*
Accounting for Remotion's scale transform.

### Text Measurement
*Source: rules/measuring-text.md*
`fitText` and `fillTextBox` for dynamic layouts.

### Composition Parameters
*Source: rules/parameters.md*
Zod schemas for Studio sidebar UI.

### Timing & Springs
*Source: rules/timing.md*
Spring physics, easing curves, and interpolation clamping.

### Transcribing
*Source: rules/transcribe-captions.md*
Local Whisper.cpp transcription script.

### Scene Transitions
*Source: rules/transitions.md*
`TransitionSeries` logic and overlap calculations.

### Transparency
*Source: rules/transparent-videos.md*
Alpha channel rendering for WebM and ProRes.

### Trimming Patterns
*Source: rules/trimming.md*
Negative `from` values on Sequences.

### Video Control
*Source: rules/videos.md*
Syncing video clips with the timeline.

### AI Voiceover
*Source: rules/voiceover.md*
ElevenLabs integration and dynamic duration syncing.
