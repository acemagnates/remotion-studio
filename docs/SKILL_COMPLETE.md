---
name: remotion-giant-skill
description: The complete consolidated skill for Remotion - All rules and patterns in one file
metadata:
  tags: remotion, video, react, master-skill, consolidated
---

# Remotion Consolidated Master Skill

This document combines all the individual Remotion rule files into a single, comprehensive reference.

---

## Table of Contents
1. [Fundamental Animations](#fundamental-animations)
2. [Assets & Media](#assets-media)
3. [Audio & Visualization](#audio--visualization)
4. [3D (Three.js)](#3d-threejs)
5. [Charts & Data](#charts--data)
6. [Compositions & Structure](#compositions--structure)
7. [Captions & Subtitles](#captions--subtitles)
8. [Effects & Transitions](#effects--transitions)
9. [Maps (Mapbox)](#maps-mapbox)
10. [Timing & Interpolation](#timing--interpolation)
11. [Advanced Rendering](#advanced-rendering)
12. [Utilities & Measuring](#utilities--measuring)

---

## 1. Fundamental Animations
### Animations (animations.md)
All animations MUST be driven by the `useCurrentFrame()` hook.
Write animations in seconds and multiply them by the `fps` value from `useVideoConfig()`.

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const FadeIn = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return <div style={{ opacity }}>Hello World!</div>;
};
```

CSS transitions or animations are FORBIDDEN - they will not render correctly.
Tailwind animation class names are FORBIDDEN - they will not render correctly.

---

## 2. Assets & Media
### Importing Assets (assets.md)
Place assets in the `public/` folder and use `staticFile()` to reference them.

```tsx
import { Img, staticFile } from "remotion";
<Img src={staticFile("logo.png")} />;
```

### Video Components (videos.md)
Use `<Video>` from `@remotion/media`.
- **Trimming:** `trimBefore` and `trimAfter` (seconds).
- **Volume:** Static (0-1) or callback `(f) => number`.
- **PlaybackRate:** Control speed.

### GIF & Animated Images (gifs.md)
Use `<AnimatedImage>` for GIFs, APNG, AVIF, and WebP.
```tsx
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} />
```

---

## 3. Audio & Visualization
### Audio Components (audio.md)
Use `<Audio>` from `@remotion/media`. Supports `playbackRate`, `loop`, and `toneFrequency` (pitch).

### Audio Visualization (audio-visualization.md)
Use `useWindowedAudioData()` and `visualizeAudio()` from `@remotion/media-utils`.
- `numberOfSamples` must be a power of 2.
- `optimizeFor: "speed"` is recommended for high sample counts.

### Sound Effects (sfx.md)
- `https://remotion.media/whoosh.wav`
- `https://remotion.media/ding.wav`
- `https://remotion.media/bruh.wav`

---

## 4. 3D (Three.js)
### Using Three.js (3d.md)
Wrap content in `<ThreeCanvas>`. All 3D content must be driven by `useCurrentFrame()`. `useFrame()` from R3F is forbidden.

```tsx
import { ThreeCanvas } from "@remotion/three";
<ThreeCanvas width={width} height={height}>
  <mesh rotation={[0, frame * 0.02, 0]}>
    <boxGeometry />
  </mesh>
</ThreeCanvas>
```

---

## 5. Charts & Data
### Charts in Remotion (charts.md)
Drive all chart animations from `useCurrentFrame()`. Use `@remotion/paths` for path-based animations (stock charts, line graphs).

---

## 6. Compositions & Structure
### Defining Compositions (compositions.md)
Normally placed in `src/Root.tsx`. Defines ID, component, duration, FPS, and dimensions.

### Dynamic Metadata (calculateMetadata.md)
Set composition props, duration, and dimensions dynamically.
```tsx
export const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props }) => {
  const duration = await getVideoDuration(props.src);
  return { durationInFrames: Math.ceil(duration * 30) };
};
```

### Parameters (parameters.md)
Add a Zod schema to enable visual editing in the Remotion Studio sidebar.
```tsx
export const MyCompSchema = z.object({ title: z.string() });
<Composition id="MyComp" schema={MyCompSchema} ... />
```

---

## 7. Captions & Subtitles
### Subtitle Standards (subtitles.md)
All captions use the `Caption` type (`text`, `startMs`, `endMs`).

### Displaying Captions (display-captions.md)
Use `createTikTokStyleCaptions()` from `@remotion/captions`. Group words into pages and highlight current words.

### Transcribing (transcribe-captions.md)
Use `@remotion/install-whisper-cpp` with Whisper.cpp for local high-accuracy transcription.

---

## 8. Effects & Transitions
### TransitionSeries (transitions.md)
Arrange scenes with overlaps. Transitions (shorten timeline) vs Overlays (no change to duration).
Supported: `fade`, `slide`, `wipe`, `flip`, `clockWipe`.

### Light Leaks (light-leaks.md)
WebGL-based decorative overlays from `@remotion/light-leaks`.

---

## 9. Maps (Mapbox)
### Map Animations (maps.md)
Animate Mapbox cameras and GeoJSON lines using `useEffect` hooks that call Mapbox API methods (`camera.lookAtPoint`, `source.setData`) on every frame change.

---

## 10. Timing & Interpolation
### Timing Patterns (timing.md)
- `interpolate()`: Map frames to values.
- `spring()`: Physics-based motion. `{ damping: 200 }` for smooth, no-bounce reveal.
- `Easing`: Quadratic, sinusoidal, exponential, circular, and bezier curves.

### Sequencing & Series (sequencing.md)
- `<Sequence>`: Delay and trim content.
- `<Series>`: Play items sequentially without overlap calculation.

### Trimming Patterns (trimming.md)
Use negative `from` on `<Sequence>` to trim the beginning of an animation.

---

## 11. Advanced Rendering
### Transparent Videos (transparent-videos.md)
- **ProRes 4444:** High-quality MOV for editors.
- **WebM VP9:** Small alpha videos for web.

### AI Voiceover (voiceover.md)
TTS integration (ElevenLabs). Generate MP3s and sync durations via `calculateMetadata`.

---

## 12. Utilities & Measuring
### DOM Measurement (measuring-dom-nodes.md)
Use `useCurrentScale()` to adjust for Remotion's container scaling.

### Text Measurement (measuring-text.md)
Use `measureText`, `fitText`, and `fillTextBox` from `@remotion/layout-utils`.

### File Metrics
- `get-video-duration.md`: Extract seconds from video.
- `get-audio-duration.md`: Extract seconds from audio.
- `get-video-dimensions.md`: Extract width/height.
- `can-decode.md`: Verify browser playback compatibility.

---
*End of Master Skill*
