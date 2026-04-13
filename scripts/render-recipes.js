const { execSync } = require('child_process');
const fs = require('fs');

const clips = [
  { id: 'CounterRoll', transparent: false },
  { id: 'LowerThird', transparent: true },
  { id: 'SplitReveal', transparent: false },
  { id: 'EvidenceCard', transparent: true },
  { id: 'ShatterBurst', transparent: false },
  { id: 'TerminalType', transparent: true },
  { id: 'DataTheater', transparent: false },
  { id: 'GlitchInterference', transparent: false },
  { id: 'ParticleDrift', transparent: true },
  { id: 'KintsugiReveal', transparent: false },
];

const outputDir = 'renders/recipe-batch';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

clips.forEach(clip => {
  console.log(`Rendering ${clip.id}...`);
  const pixelFormat = clip.transparent ? 'yuva420p' : 'yuv420p';
  try {
    execSync(`npx remotion render src/index.ts ${clip.id} ${outputDir}/${clip.id}.webm --image-format=png --codec=vp9 --pixel-format=${pixelFormat}`, { stdio: 'inherit' });
    console.log(`Successfully rendered ${clip.id}`);
  } catch (error) {
    console.error(`Failed to render ${clip.id}:`, error.message);
  }
});
